import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import UserBalance from "./UserBalance";

export default function WalletComp({ user }) {
    return (
        // <div className="flex items-center px-10 py-2 space-x-2 rounded-lg bg-scamdom-40">
        //     <div className="flex items-center space-x-1 text-white">
        //         <span className="text-lg text-green-400">$</span>
        //         <span className="text-lg font-semibold">

        //             <UserBalance user={user}></UserBalance>
        //         </span>
        //     </div>
        //     <Link
        //         href="/wallet"
        //         className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
        //     >
        //         Wallet
        //     </Link>
        // </div>

        <div className="flex items-center justify-around w-full rounded-md h-14 bg-scamdom-40">
            <div className="flex">
                <span className="mr-2 text-lg text-green-400">$</span>
                <span className="mr-2 text-lg font-semibold">
                    <UserBalance user={user}></UserBalance>
                </span>
            </div>
            <Link
                href="/wallet"
                className="px-4 py-2 font-semibold text-black bg-green-500 rounded-md hover:bg-green-600"
            >
                Wallet
            </Link>
        </div>
    );
}
