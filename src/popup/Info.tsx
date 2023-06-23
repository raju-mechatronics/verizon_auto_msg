import { useEffect, useState } from "react";
import {
  extractMessageFromText,
  extractMessages,
  extractNumbers,
} from "./service";
import {
  getInterval,
  getMessages,
  getNumbers,
  initialize,
  setNumbers as setNumbersToStorage,
  setInterval as setIntervalToStorage,
  setMessages as setMessagesToStorage,
} from "../common/storage";

const Info = () => {
  const [contacts, setContacts] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(0);

  useEffect(() => {
    getInterval().then((interval) => setInterval(interval));
    getMessages().then((messages) => setMessages(messages || []));
    getNumbers().then((numbers) => setContacts(numbers || []));
  }, []);

  return (
    <div>
      <div className="form-control">
        <input
          type="number"
          placeholder="Interval in seconds"
          className="input w-full input-sm border-gray-300 rounded-none"
          onChange={(e) => {
            const interval = parseInt(e.target.value);
            setInterval(interval);
            setIntervalToStorage(interval);
          }}
          value={interval}
        />
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
          onChange={(e) => {
            setContacts(e.target.value.split("\n"));
            setNumbersToStorage(e.target.value.split("\n"));
          }}
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
          onChange={(e) => {
            const messages = extractMessageFromText(e.target.value);
            setMessages(messages);
            setMessagesToStorage(messages);
          }}
          value={messages.join("\n\n====================\n\n")}
          rows={4}
        />
        <button
          className="btn btn-info !text-white rounded-none my-4"
          disabled={!contacts.length && !messages.length}
          onClick={() => {
            initialize(contacts, messages, interval);
          }}
        >
          Add Messages
        </button>
      </div>
    </div>
  );
};

export default Info;
