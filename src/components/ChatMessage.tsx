import { Message } from "@/types";
import { ThumbsUp, ThumbsDown } from "@/components/Icons";

export type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="container-message">
      <div className="container-message-inner">
        <div className="container-avatar">
          <div className="container-avatar-inner">
            <img src={message.avatarUrl} />
          </div>
        </div>
        <div className="container-message-body">
          <div className="container-message-body-text">
            <div className="container-message-body-wrap">
              <div className="markdown md">
                <p>{message.body}</p>
              </div>
            </div>
          </div>
          {message.isSystem && (
            <div className="container-message-feedback">
              <div className="feedback">
                <button>
                  <ThumbsUp />
                </button>
                <button>
                  <ThumbsDown />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
