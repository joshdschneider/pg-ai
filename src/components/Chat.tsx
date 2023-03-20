import { SyntheticEvent, useState } from "react";
import { apiKey, getId, pgAvatar, userAvatar } from "@/utils";
import endent from "endent";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { useChatScroll } from "@/hooks/useChatScroll";
import { Message, PGChunk } from "@/types";

export const defaultMessage = {
  id: getId(),
  avatarUrl: pgAvatar,
  body: `Hi! I'm an AI assistant trained on Paul Graham's essays. How can I help you?`,
  isSystem: true,
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([defaultMessage]);
  const [query, setQuery] = useState<string>("");
  const { ref } = useChatScroll({ messages });

  async function submitQuery(e: SyntheticEvent) {
    try {
      e.preventDefault();

      if (!query) {
        alert("Please enter a query.");
        return;
      }

      const q = query;
      setQuery("");

      const userId = getId();
      const allMessages = messages;
      const userMessage = {
        id: userId,
        avatarUrl: userAvatar,
        body: q,
        isSystem: false,
      };

      const arr = [...allMessages, userMessage];
      setMessages(arr);
      const sysId = getId();
      const sysMessage = {
        id: sysId,
        avatarUrl: pgAvatar,
        body: "",
        isSystem: true,
      };

      const updatedArr = [...arr, sysMessage];
      setMessages(updatedArr);

      const searchResults = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, apiKey }),
      });

      const chunks: PGChunk[] = await searchResults.json();

      const prompt = endent`
      Use the following passages to provide an answer to the query: "${q}"

      ${chunks.map((d: any) => d.content).join("\n\n")}
      `;

      const answerResponse = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiKey }),
      });

      const data = answerResponse.body;
      if (!data) {
        return;
      }

      const i = updatedArr.findIndex((m) => m.id === sysId);
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let body = updatedArr[i].body;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        body = body + chunkValue;
        const updatedMessage = { ...updatedArr[i], body };

        setMessages([
          ...updatedArr.slice(0, i),
          updatedMessage,
          ...updatedArr.slice(i + 1),
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="container-main">
      <ChatContainer scrollRef={ref}>
        {messages.map((message) => {
          return <ChatMessage message={message} key={message.id} />;
        })}
        <div className="container-message-pad" />
      </ChatContainer>
      <ChatInput query={query} setQuery={setQuery} submitQuery={submitQuery} />
    </main>
  );
};
