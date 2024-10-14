import React, { useEffect, useState, useContext } from "react";
import { Link } from "@inertiajs/react";
import { BalanceContext } from "@/Layouts/AuthenticatedLayout.jsx";

export default function WalletComp({ user }) {
    function formatCurrency(amount, locale = "nl-NL") {
        const options = {
            style: "decimal",
            minimumFractionDigits: amount < 100 ? 2 : 0,
            maximumFractionDigits: amount < 100 ? 2 : 0,
        };

        return new Intl.NumberFormat(locale, options).format(amount);
    }
    const balance = useContext(BalanceContext);

    const formattedBalance = formatCurrency(balance);

    return (
        <div className="flex items-center justify-around w-full rounded-md h-14 bg-scamdom-40">
            <div className="flex">
                <span className="mr-2 text-lg text-green-400">$</span>
                <span className="mr-2 text-lg font-semibold">
                    {formattedBalance}
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
