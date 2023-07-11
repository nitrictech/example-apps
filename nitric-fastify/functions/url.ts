import Fastify from "fastify";
import { http, bucket } from "@nitric/sdk";

const fastify = Fastify({
  logger: true,
});

export const imgBucket = bucket("images").for("reading", "writing");

interface Params {
  id: string;
}

fastify.get<{ Params: Params }>("/upload/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const img = imgBucket.file(`images/${id}/photo.png`);

    reply.code(200).send({ url: await img.getUploadUrl() });
  } catch (err) {
    reply.code(500).send("Error getting file URL");
  }
});

const bootstrap = async (port: number) => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

http(bootstrap, () => {
  console.log(`Application started`);
});
