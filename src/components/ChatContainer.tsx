import { ReactNode, RefObject } from "react";

export type ChatContainerProps = {
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement>;
};

export const ChatContainer = ({ children, scrollRef }: ChatContainerProps) => {
  return (
    <div className="container-overflow-hidden">
      <div className="container-relative">
        <div className="container-scrollable" ref={scrollRef}>
          <div className="container-messages">{children}</div>
        </div>
      </div>
    </div>
  );
};
