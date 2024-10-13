import { useState, createContext } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import Header from "@/Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveChat from "@/Components/LiveChat";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";

export const UserContext = createContext();
const isOpen = signal(localStorage.getItem("chatOpen") === "true");

const toggleChat = () => {
    isOpen.value = !isOpen.value;
    localStorage.setItem("chatOpen", isOpen.value);
};

export default function Authenticated({ user, children }) {
    useSignals(); // This will allow the layout to re-render when isOpen changes
    return (
        <UserContext.Provider value={user}>
            <div
                className={`min-h-screen bg-scamdom-90 transition-all duration-300 ${
                    isOpen.value ? "mr-80" : "mr-0"
                }`}
            >
                <Header user={user} />
                <div className="py-16">
                    <div className="relative mx-auto max-w-8xl sm:px-6 lg:px-8">
                        {/* Main content */}
                        <main
                            className={`${
                                isOpen ? "w-auto" : "w-full"
                            } transition-all duration-300`}
                        >
                            {children}
                        </main>

                        {/* Pass the toggleChat function and isOpen state as props */}
                        <LiveChat isOpen={isOpen} toggleChat={toggleChat} />
                    </div>
                </div>
                <ToastContainer />
            </div>
        </UserContext.Provider>
    );
}
