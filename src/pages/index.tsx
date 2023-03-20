import Head from "next/head";
import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <div className="app">
      <Head>
        <title>Paul Graham AI</title>
      </Head>
      <Chat />
    </div>
  );
}
