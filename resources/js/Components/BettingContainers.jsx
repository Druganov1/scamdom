import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

export function BettingContainers({ betAmount }) {
    const [betCounts, setBetCounts] = useState({
        red: 0,
        black: 0,
        green: 0,
    });

    const [betAounts, setBetAmounts] = useState({
        red: 0,
        black: 0,
        green: 0,
    });

    useEffect(() => {
        const channel = Echo.channel("roulette");

        channel.listen("liveBetsRoulette", (e) => {
            let data = e.data;
            console.log(data);
            // deze functie hieronder bekijkt dus op wat gebet is, en past vervolgens onze state aan.
            setBetCounts((prevCounts) => {
                const newCounts = { ...prevCounts };

                if (data.bet_position === "red") {
                    newCounts.red += 1;
                } else if (data.bet_position === "black") {
                    newCounts.black += 1;
                } else if (data.bet_position === "green") {
                    newCounts.green += 1;
                }

                return newCounts; // Return the updated counts
            });

            // Update bet amounts
            setBetAmounts((prevAmounts) => {
                const newAmounts = { ...prevAmounts };

                if (data.bet_position === "red") {
                    newAmounts.red += parseFloat(data.bet_amount);
                } else if (data.bet_position === "black") {
                    newAmounts.black += parseFloat(data.bet_amount);
                } else if (data.bet_position === "green") {
                    newAmounts.green += parseFloat(data.bet_amount);
                }

                return newAmounts; // Return the updated amounts
            });
        });

        return () => {
            channel.stopListening("liveBetsRoulette");
        };
    }, []);
    const placeBet = (pos) => {
        const data = {
            bet_amount: betAmount,
            bet_position: pos,
        };
        axios.post(route("api.roulette-bet"), data).then((response) => {
            // Hier kijken of we een error hebben... bijv als de inzet te hoog is
        });
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {/*<div className="text-5xl font-bold">*/}
            {/*    {betAmount}*/}
            {/*</div>*/}
            <div className="flex flex-col items-center w-full space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        Potential Profit:{" "}
                        <span className="font-bold">
                            {" "}
                            $
                            {!isNaN(parseFloat(betAmount))
                                ? new Intl.NumberFormat("nl-NL", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }).format(parseFloat(betAmount).toFixed(2))
                                : "0.00"}{" "}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("red")}
                        className="w-11/12 py-3 text-lg text-white bg-roulette-red rounded-xl"
                    >
                        1 to 7
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.red}
                        </span>
                        <span>${betAounts.red.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        Potential Profit:{" "}
                        <span className="font-bold">
                            $
                            {!isNaN(parseFloat(betAmount))
                                ? new Intl.NumberFormat("nl-NL", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }).format(
                                      (parseFloat(betAmount) * 13).toFixed(2)
                                  )
                                : "0.00"}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("green")}
                        className="w-11/12 py-3 text-lg text-white bg-roulette-green rounded-xl"
                    >
                        0
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.green}
                        </span>
                        <span>${betAounts.green.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        Potential Profit:{" "}
                        <span className="font-bold">
                            $
                            {!isNaN(parseFloat(betAmount))
                                ? new Intl.NumberFormat("nl-NL", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }).format(parseFloat(betAmount).toFixed(2))
                                : "0.00"}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("black")}
                        className="w-11/12 py-3 text-lg text-white bg-gray-500 rounded-xl"
                    >
                        8 to 14
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.black}
                        </span>
                        <span>${betAounts.black.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
