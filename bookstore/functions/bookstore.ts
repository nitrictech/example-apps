import { api, collection, topic, schedule } from "@nitric/sdk";
import { v4 as uuid } from "uuid";

// Create an API named 'public'
const bookstoreApi = api("public");

// Define a collection named 'books', then request reading and writing permissions.
const books = collection("books").for("writing", "reading");

const newBookTopic = topic("newBook").for("publishing");

// CREATE: Add a new book
bookstoreApi.post("/books", async (ctx) => {
  let id = uuid();
  try {
    await books.doc(id).set({
      title: ctx.req.json().title,
      author: ctx.req.json().author,
      publishedDate: ctx.req.json().publishedDate,
      isbn: ctx.req.json().isbn,
    });

    ctx.res.json({
      msg: `Book with id ${id} created.`,
    });
  } catch {
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Book with id ${id} not created.`,
    });
  }
});

// READ: Retrieve a book by its ID
bookstoreApi.get("/books/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    const book = await books.doc(id).get();
    return ctx.res.json(book);
  } catch (error) {
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Book with id ${id} not found.`,
    });
  }
});

// UPDATE: Update a book by its ID
bookstoreApi.put("/books/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    await books.doc(id).set({
      title: ctx.req.json().title,
      author: ctx.req.json().author,
      publishedDate: ctx.req.json().publishedDate,
      isbn: ctx.req.json().isbn,
    });
    ctx.res.json({
      msg: `Book with id ${id} updated.`,
    });
  } catch (error) {
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Book with id ${id} not found.`,
    });
  }
});

// TODO DELETE: Remove a book by its ID
bookstoreApi.delete("/books/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    await books.doc(id).delete();
    ctx.res.json({
      msg: `Book with id ${id} deleted.`,
    });
  } catch (error) {
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Book with id ${id} not found.`,
    });
  }
});

// Fetch all books
bookstoreApi.get("/books", async (ctx) => {
  ctx.res.json({
    output: await books.query().fetch(),
  });
});

// READ: Retrieve all books by author
bookstoreApi.get("/books/author/:author", async (ctx) => {
  const { author } = ctx.req.params;
  try {
    const book = await books.query().where("author", "==", author).fetch();
    return ctx.res.json(book);
  } catch (error) {
    // publish a topic
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Book with author ${author} not found.`,
    });
    // publish a topic
    await newBookTopic.publish({
      title: ctx.req.json().title,
      author: ctx.req.json().author,
      publishedDate: ctx.req.json().publishedDate,
      isbn: ctx.req.json().isbn,
    });
  }
});

// Using the Nitric SDK create a scheduled tasks API create a schedule which runs every 5 minutes
schedule("scheduledTasks").every("3 ", async (ctx) => {
  // Fetch a random book from the collection
  const book = await books.query().fetch();

  // publish an event to the book topic to let them know a new book has arrived
  await newBookTopic.publish({
    book,
  });
});
