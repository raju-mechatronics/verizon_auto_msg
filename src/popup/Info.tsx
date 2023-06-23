import { useState } from "react";
import { extractMessages, extractNumbers } from "./service";
import { initialize } from "../common/storage";

const Info = () => {
  const [contacts, setContacts] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Contacts</span>
          <input
            type="file"
            hidden
            accept=".txt"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const numbers = await extractNumbers(file);
                setContacts(numbers);
              }
            }}
          />
          <span className="btn btn-sm">select file</span>
        </label>
        <textarea
          className="textarea textarea-bordered resize-none rounded-none"
          placeholder="Contacts"
          rows={4}
          onChange={(e) => setContacts(e.target.value.split("\n"))}
          value={contacts.join("\n")}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Messages</span>
          <input
            type="file"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const msgs = await extractMessages(file);
                setMessages(msgs);
              }
            }}
          />
          <span className="btn btn-sm">select file</span>
        </label>
        <textarea
          className="textarea textarea-bordered resize-none rounded-none"
          placeholder="Messages"
          onChange={(e) =>
            setMessages(e.target.value.split("\n\n====================\n\n"))
          }
          value={messages.join("\n\n====================\n\n")}
          rows={4}
        />
        <button
          className="btn btn-info !text-white rounded-none my-4"
          disabled={!contacts.length && !messages.length}
          onClick={() => {
            initialize(contacts, messages);
          }}
        >
          Add Messages
        </button>
      </div>
    </div>
  );
};

export default Info;
