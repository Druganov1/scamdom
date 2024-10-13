import React, { useEffect, useRef } from "react";
import { TbSend } from "react-icons/tb";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import axios from "axios";

const message = signal("");
const messages = signal([]); // Initialize as an empty array

export default function LiveChat({ isOpen, toggleChat }) {
    useSignals();
    const lastMessageRef = useRef(null); // Create a ref for the last message
    useEffect(() => {
        // Mockup: Example to listen to the 'roulette' WebSocket channel
        axios.get(route("api.getMessages")).then((response) => {
            const messageArray = Object.values(response.data);
            messages.value = messageArray; // Assuming response.data is an array
            console.log(messageArray);
            scrollToBottom();
        });

        const channel = Echo.channel("LiveChat");
        channel.listen("NewChatMessage", (e) => {
            let data = e.data;
            console.log(data);
            messages.value = [...messages.value, data]; // Append new message
            scrollToBottom();
        });

        return () => {
            channel.stopListening("NewChatMessage");
        };
    }, []);

    const sendMessage = async () => {
        if (message.value.trim() === "") return; // Prevent sending empty messages
        const response = await axios.post(route("api.sendChatMessage"), {
            message: message.value,
        });
        message.value = ""; // Clear the input after sending
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        }, 100); // Adjust the timeout as necessary
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                className="fixed z-50 p-2 text-white bg-blue-500 rounded-full bottom-4 right-4"
                onClick={toggleChat}
            >
                {isOpen.value ? "Close Chat" : "Open Chat"}
            </button>
            {/* Chat Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-screen md:w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out  ${
                    isOpen.value ? "translate-x-0" : "translate-x-full"
                }
                `}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 text-white border-b-2 py-7 bg-scamdom-chat border-scamdom-30">
                        <h2 className="text-lg font-semibold">Main chat</h2>
                        <button onClick={toggleChat}>X</button>
                    </div>
                    <div className="flex-grow px-4 py-2 overflow-y-auto bg-scamdom-chat">
                        <ul>
                            {messages.value.map((msg, index) => (
                                <li
                                    className={` [&:not(:last-child)]:mb-3  text-sm text-white rounded-md ${
                                        msg.is_mod ? "bg-[#1e252f] p-2" : ""
                                    }`}
                                    key={msg.id}
                                    ref={
                                        index === messages.value.length - 1
                                            ? lastMessageRef
                                            : null
                                    }
                                >
                                    <div className="relative break-words whitespace-pre-wrap">
                                        {msg.is_mod ? (
                                            <>
                                                <div className="absolute w-1 h-full bg-yellow-500 rounded-md -left-6"></div>
                                                <span className="px-2 py-1 mr-2 text-xs text-black bg-yellow-500 rounded-md">
                                                    Moderator
                                                </span>
                                            </>
                                        ) : null}
                                        <span className="mr-1 text-slate-400">
                                            {msg.sender_name}:{" "}
                                        </span>
                                        <span className="leading-6">
                                            {msg.message}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-3 border-t-2 bg-scamdom-chat border-scamdom-30">
                        <div className="relative w-full mx-auto">
                            <input
                                placeholder="Start typing..."
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                value={message.value}
                                onChange={(e) =>
                                    (message.value = e.target.value)
                                }
                                className="w-full px-4 py-2 pr-12 overflow-x-auto text-white transition duration-500 border-transparent bg-scamdom-30 focus:ring-transparent focus:border-scamgreen-30 rounded-xl hover:border-scamgreen-30" // Adjusted padding
                            />
                            <button
                                onClick={sendMessage}
                                className="active:scale-90 duration-110 absolute hover:bg-scamdom-40 rounded-xl right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-scamgreen-30 transition duration-500"
                            >
                                <TbSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
