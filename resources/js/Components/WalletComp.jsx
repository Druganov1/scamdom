import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import UserBalance from "./UserBalance";

export default function WalletComp({ user }) {
    return (
        <div className="flex items-center px-4 py-2 space-x-2 rounded-lg bg-scamdom-40">
            <div className="flex items-center space-x-1 text-white">
                <span className="text-lg text-green-400">$</span>
                <span className="text-lg font-semibold">
                    {" "}
                    <UserBalance user={user}></UserBalance>{" "}
                </span>
            </div>
            <Link
                href="/wallet"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
                Wallet
            </Link>
        </div>
    );
}
