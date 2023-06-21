import { useState } from "react";
const DEFAULT_CONTACTS = [
    "1313132323",
    "1313132323",
    "13131323",
    "13131323",
    "13131323",
    "131313",
    "13131383",
    "13131354",
];
const DEFAULT_MESSAGES = [
    "aaaaaaaaaaa",
    "=================================",
    "bbbbbbbbbbb",
    "==============================",
    "ccccccccccc",
    "===========================",
    "ddddddddddd",
    "================================",
    "eeeeeeeeeeee",
    "========================",
    "ffffffffffff",
    "============================",
];

const Info = () => {
    console.log(DEFAULT_CONTACTS.join("\n"));
    const [contacts, setContacts] = useState(DEFAULT_CONTACTS.join("\n"));
    const [messages, setMessages] = useState(DEFAULT_MESSAGES.join("\n"));

    const handleSaveContacts = () => {
        console.log("handleSaveContacts");
        const filteredContacts = contacts.split("\n");

        localStorage.setItem("contacts", JSON.stringify(filteredContacts));
    };

    const handleSaveMessages = () => {
        console.log("handleSaveMessages");
        const filteredMessages = messages
            .split("\n")
            .filter((message) => !/^=+$/.test(message.trim()));

        localStorage.setItem("messages", JSON.stringify(filteredMessages));
    };

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Contacts</span>
                </label>
                <textarea
                    className="textarea textarea-bordered resize-none rounded-none"
                    placeholder="Contacts"
                    onChange={(e) => setContacts(e.target.value)}
                    value={contacts}
                    rows={4}
                />
                <button
                    className="btn btn-accent !text-white rounded-none my-4"
                    disabled={contacts.length === 0}
                    onClick={handleSaveContacts}
                >
                    Add Contacts
                </button>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Messages</span>
                </label>
                <textarea
                    className="textarea textarea-bordered resize-none rounded-none"
                    placeholder="Messages"
                    onChange={(e) => setMessages(e.target.value)}
                    value={messages}
                    rows={4}
                />
                <button
                    className="btn btn-info !text-white rounded-none my-4"
                    disabled={messages.length === 0}
                    onClick={handleSaveMessages}
                >
                    Add Messages
                </button>
            </div>
        </div>
    );
};

export default Info;
