/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Info from "./Info";

const sendMessage = (message: string) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            const temp = Math.round(Math.random() * 1000) % 2;
            console.log({ temp });
            temp ? resolve(message) : reject(message);
        }, 3000)
    );

// In the popup script
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "init" },
        function (response) {
            // Handle the response from the content script
            console.log(response);
        }
    );
});

function App() {
    const handler = () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            async function (tabs) {
                console.log({ tabs });

                let messages = localStorage.getItem("messages");
                let contacts = localStorage.getItem("contacts");
                messages = messages ? JSON.parse(messages) : [];
                contacts = contacts ? JSON.parse(contacts) : [];

                await messages?.map(async (message) => {
                    try {
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            { action: "sending" },
                            function (response) {
                                // Handle the response from the content script
                                console.log(response);
                            }
                        );
                        await sendMessage(message);
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            { action: "sent" },
                            function (response) {
                                // Handle the response from the content script
                                console.log(response);
                            }
                        );
                    } catch (error) {
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            { action: "failed" },
                            function (response) {
                                // Handle the response from the content script
                                console.log(response);
                            }
                        );
                    }
                });
            }
        );
    };

    return (
        <div className="min-h-[25rem] w-96 m-2 p-2 border">
            <h2 className="text-xl drop-shadow-md font-semibold text-center">
                A Title should be here
            </h2>
            <div className="divider mt-0" />
            <Info />
            <button className="btn btn-error" onClick={handler}>
                Test button
            </button>
        </div>
    );
}

export default App;
