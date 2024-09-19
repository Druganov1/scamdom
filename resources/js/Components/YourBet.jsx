import UserBalance from "@/Components/UserBalance.jsx";
import {Link} from "@inertiajs/react";
import React from "react";

export default function YourBet() {
    return (
        <>
            <div className="items-center space-x-2 bg-scamdom-40 rounded-lg px-4 py-2">
                <label className="text-gray-400 text-xs">Your bet</label>
                <div className="flex items-center space-x-1 text-white">
                    <input placeholder={"0.00"} className="bg-scamdom-30 focus:ring-transparent focus:border-scamgreen-30  rounded-xl border-transparent transition duration-500 hover:border-scamgreen-30"/>
                    <button className="bg-scamgreen-50">+$10</button>
                </div>
            </div>
        </>
    )
}
