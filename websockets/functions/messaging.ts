// Import necessary modules
import { websocket, collection } from "@nitric/sdk";

// Create a collection to store connections
const connections = collection("connections").for(
  "reading",
  "writing",
  "deleting"
);

// Initialize the WebSocket server
const socket = websocket("socket");

// Handle new client connections
socket.on("connect", async (ctx) => {
  // Store the new connection in the collection
  await connections.doc(ctx.req.connectionId).set({});
});

// Handle client disconnections
socket.on("disconnect", async (ctx) => {
  // Remove the disconnected client from the collection
  await connections.doc(ctx.req.connectionId).delete();
});

// Handle incoming messages from clients
socket.on("message", async (ctx) => {
  // Get all connections from the collection
  const allConnections = await connections.query().stream();

  // Create a promise that resolves when the stream ends
  const streamEnd = new Promise<any>((res) => allConnections.on("end", res));

  // Broadcast the incoming message to all connected clients except the sender
  allConnections.on("data", async (connection) => {
    if (connection.id !== ctx.req.connectionId) {
      await socket.send(connection.id, ctx.req.data);
    }
  });

  // Wait for the stream to end
  await streamEnd;
});
