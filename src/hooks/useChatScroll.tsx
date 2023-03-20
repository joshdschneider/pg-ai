import { Message } from "@/types";
import { createRef, useEffect } from "react";

export type ChatScrollProps = {
  messages: Message[];
};

export const useChatScroll = ({ messages }: ChatScrollProps) => {
  const scrollRef = createRef<HTMLDivElement>();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, scrollRef]);

  return {
    ref: scrollRef,
  };
};
