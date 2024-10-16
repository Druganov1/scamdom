import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Bets({ auth, bets }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [betsPerPage] = useState(10); // Set the number of items per page

    // Calculate current bets to display
    const indexOfLastBet = currentPage * betsPerPage;
    const indexOfFirstBet = indexOfLastBet - betsPerPage;
    const currentBets = bets.slice(indexOfFirstBet, indexOfLastBet);

    // Calculate the total number of pages
    const totalPages = Math.ceil(bets.length / betsPerPage);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log(bets);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Bets" />

            <div className="container px-3 py-12 mx-auto md:px-0">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 p-4 bg-gray-800 shadow sm:p-8 rounded-2xl">
                        <h1 className="text-3xl text-white">My bets</h1>

                        {currentBets.map((bet) => (
                            <div
                                key={bet.id}
                                className="flex items-center justify-between w-full p-4 text-sm text-white bg-gray-700 rounded-md"
                            >
                                <div className="flex flex-col justify-start flex-1">
                                    <span className="text-white">
                                        ${bet.bet_amount}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {bet.game_type}
                                    </span>
                                </div>
                                <div className="flex flex-col flex-1 max-w-full overflow-hidden text-center text-slate-200">
                                    <div className="leading-none break-words whitespace-normal">
                                        Date:{" "}
                                        {new Date(
                                            bet.bet_time
                                        ).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Hash: {bet.game_id}
                                    </div>
                                </div>

                                <div
                                    className={`flex justify-end flex-1 text-center ${
                                        bet.win_amount > 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    <span>
                                        {bet.win_amount > 0
                                            ? "📈 Profit"
                                            : "📉 Loss"}
                                    </span>
                                    <span className="hidden ml-1 text-slate-300 md:block">
                                        {bet.win_amount > 0
                                            ? `(+ $${bet.win_amount})`
                                            : `(- $${Math.abs(
                                                  bet.bet_amount
                                              )})`}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center gap-2 mt-4">
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`p-2 rounded text-white ${
                                        number === currentPage
                                            ? "bg-blue-500"
                                            : "bg-gray-700"
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
