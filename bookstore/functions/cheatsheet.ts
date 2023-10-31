import { api, collection } from "@nitric/sdk";
import { v4 as uuid } from "uuid";

// Create an API named 'public'
const customer = api("customer");

// Define a collection named 'books', then request reading and writing permissions.
const customers = collection("books").for("writing", "reading");

// Create: Add a new customer
customer.post("/customers", async (ctx) => {
  let id = uuid();
  try {
    await customers.doc(id).set({
      firstName: ctx.req.json().firstName,
      lastName: ctx.req.json().lastName,
      email: ctx.req.json().email,
      phone: ctx.req.json().phone,
    });

    ctx.res.json({
      msg: `Customer with id ${id} created.`,
    });
  } catch {
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Customer with id ${id} not created.`,
    });
  }
});

// Read: Retrieve a customer by its ID
customer.get("/customers/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    const customer = await customers.doc(id).get();
    return ctx.res.json(customer);
  } catch (error) {
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Customer with id ${id} not found.`,
    });
  }
});

// Update: Update a customer by its ID
customer.put("/customers/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    await customers.doc(id).set({
      firstName: ctx.req.json().firstName,
      lastName: ctx.req.json().lastName,
      email: ctx.req.json().email,
      phone: ctx.req.json().phone,
    });
    ctx.res.json({
      msg: `Customer with id ${id} updated.`,
    });
  } catch {
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Customer with id ${id} not updated.`,
    });
  }
});

// Delete: Delete a customer by its ID
customer.delete("/customers/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    await customers.doc(id).delete();
    ctx.res.json({
      msg: `Customer with id ${id} deleted.`,
    });
  } catch {
    ctx.res.status = 404;
    ctx.res.json({
      msg: `Customer with id ${id} not deleted.`,
    });
  }
});
