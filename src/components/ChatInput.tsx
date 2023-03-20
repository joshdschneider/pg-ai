import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { SendArrow } from "./Icons";

export type ChatInputProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  submitQuery: FormEventHandler<HTMLFormElement>;
};

export const ChatInput = ({ query, setQuery, submitQuery }: ChatInputProps) => {
  return (
    <div className="form-container">
      <form className="form" onSubmit={submitQuery}>
        <div className="form-inner">
          <div className="input-group">
            <textarea
              className="textarea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="send-button">
              <SendArrow />
            </button>
          </div>
        </div>
      </form>
      <div className="footnote">Beta preview of Paul Graham AI.</div>
    </div>
  );
};
