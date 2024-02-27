import { websocket, kv } from "@nitric/sdk";

// Initialize KV store for connections and a WebSocket
const kvStore = kv("connections").for("getting", "setting", "deleting");
const socket = websocket("example-websocket");

// Helper function to get current connections
async function getCurrentConnections() {
  try {
    const serializedList = await kvStore.get("connections");
    return serializedList && serializedList["ids"]
      ? JSON.parse(serializedList["ids"])
      : [];
  } catch (error) {
    console.error("Error getting current connections:", error);
    return [];
  }
}

// Helper function to update connections list
async function updateConnections(connections) {
  try {
    const updatedSerializedList = JSON.stringify(connections);
    await kvStore.set("connections", { ids: updatedSerializedList });
  } catch (error) {
    console.error("Error updating connections:", error);
  }
}

// Handle new connections
socket.on("connect", async (ctx) => {
  const connections = await getCurrentConnections();
  connections.push(ctx.req.connectionId);
  await updateConnections(connections);
});

// Handle disconnections
socket.on("disconnect", async (ctx) => {
  const disconnectedId = ctx.req.connectionId;
  const connections = await getCurrentConnections();
  const index = connections.indexOf(disconnectedId);

  if (index > -1) {
    connections.splice(index, 1);
    await updateConnections(connections);
  }
});

// Send messages
socket.on("message", async (ctx) => {
  const message = ctx.req.text();
  const connections = await getCurrentConnections();

  // Send the message to each connection
  connections.forEach(async (connectionId) => {
    try {
      await socket.send(connectionId, message);
    } catch (error) {
      console.error(`Error sending message to ${connectionId}:`, error);
    }
  });
});
