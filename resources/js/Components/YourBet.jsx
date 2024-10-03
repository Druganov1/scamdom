import UserBalance from "@/Components/UserBalance.jsx";
import {Link} from "@inertiajs/react";
import React from "react";

export default function YourBet() {
    return (
            <div className="items-center space-x-2 bg-scamdom-40 rounded-lg py-2 flex justify-center grid-cols-5">
                <label className="text-gray-400 text-xs">Your bet</label>
                <div className="flex items-center space-x-1 text-white">
                    <div className="relative">
                        <input placeholder={"0.00"}
                               className="bg-scamdom-30 focus:ring-transparent focus:border-scamgreen-30  rounded-xl border-transparent transition duration-500 hover:border-scamgreen-30">
                        </input>
                        <button className="absolute bg-scamdom-40 rounded-xl right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 hover:text-scamgreen-30 transition duration-500">Clear</button>
                    </div>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>+$10</h6></button>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>+$50</h6></button>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>+$100</h6></button>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>1/2</h6></button>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>x2</h6></button>
                    <button className="bg-scamgreen-50 px-12 h-10 rounded-md text-scamgreen-40"><h6>Max</h6></button>
                </div>
            </div>
    )
}
