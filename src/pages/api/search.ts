import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { query } = (await req.json()) as {
      query: string;
    };

    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: "us-east1-gcp",
      apiKey: process.env.PINECONE_API_KEY ?? "",
    });

    const index = pinecone.Index("paul-graham-ai");
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex: index }
    );

    const results = await vectorStore.similaritySearch(query, 7);
    const chunks = results.map((chunk) => chunk.pageContent);

    return new Response(JSON.stringify(chunks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
