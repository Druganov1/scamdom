import React, { useEffect, useState, useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { BalanceContext } from "@/Layouts/AuthenticatedLayout.jsx";

export function BettingContainers({ betAmount }) {
    const balance = useContext(BalanceContext);

    const [betCounts, setBetCounts] = useState({
        red: 0,
        black: 0,
        green: 0,
    });

    const [betAmounts, setBetAmounts] = useState({
        red: 0,
        black: 0,
        green: 0,
    });

    const [uniqueUsers, setUniqueUsers] = useState({
        red: new Set(),
        black: new Set(),
        green: new Set(),
    });
    const [displayedAmounts, setDisplayedAmounts] = useState({
        red: 0,
        black: 0,
        green: 0,
    });

    const [locked, setLocked] = useState(false);

    const resetBets = () => {
        setBetCounts({ red: 0, black: 0, green: 0 });
        setBetAmounts({ red: 0, black: 0, green: 0 });
        setUniqueUsers({ red: new Set(), black: new Set(), green: new Set() });
        setDisplayedAmounts({ red: 0, black: 0, green: 0 });
    };

    useEffect(() => {
        const channel = Echo.channel("roulette");

        channel.listen("RouletteService", (e) => {
            let data = e.data;
            switch (data.currentStage) {
                case "countdown":
                    setLocked(false);
                    resetBets();
                    break;
                case "spin":
                    setLocked(true);
                    break;
                default:
                    break;
            }
        });

        channel.listen("liveBetsRoulette", (e) => {
            const data = e.data; // This contains details of the bet from a single user
            console.log("Bet Data:", data); // Log the incoming data

            const betPosition = data.bet_position; // e.g., 'red', 'black', or 'green'
            const username = data.user; // Use 'user' to get the username

            // Update unique users and bet counts
            setUniqueUsers((prevUsers) => {
                const newUsers = { ...prevUsers };
                // Check if the username is already in the set for this position
                if (!newUsers[betPosition].has(username)) {
                    newUsers[betPosition].add(username);
                    // If it's a new user, increment the bet count
                    setBetCounts((prevCounts) => ({
                        ...prevCounts,
                        [betPosition]: prevCounts[betPosition] + 1,
                    }));
                }
                return newUsers; // Return the updated unique users
            });

            // Update bet amounts
            setBetAmounts((prevAmounts) => {
                const newAmounts = { ...prevAmounts };
                newAmounts[betPosition] += parseFloat(data.bet_amount); // Add the bet amount
                return newAmounts; // Return the updated amounts
            });
        });

        return () => {
            channel.stopListening("liveBetsRoulette");
            channel.stopListening("RouletteService");
        };
    }, []); // Note: Don't include uniqueUsers as a dependency

    useEffect(() => {
        const incrementAmount = (position, targetAmount) => {
            const difference = targetAmount - displayedAmounts[position];
            const increment = Math.max(1, Math.floor(difference / 50)); // Adjust the divisor for speed
            const interval = setInterval(() => {
                setDisplayedAmounts((prevDisplayed) => {
                    const newAmount = Math.min(
                        prevDisplayed[position] + increment,
                        targetAmount
                    );
                    if (newAmount === targetAmount) clearInterval(interval); // Stop if we've reached the target
                    return { ...prevDisplayed, [position]: newAmount };
                });
            }, 10); // Change the interval duration to control the speed
        };

        // Increment for each position
        Object.keys(betAmounts).forEach((key) => {
            if (betAmounts[key] !== displayedAmounts[key]) {
                incrementAmount(key, betAmounts[key]);
            }
        });
    }, [betAmounts, displayedAmounts]); // Added displayedAmounts to dependency array

    const placeBet = (pos) => {
        if (
            locked ||
            parseFloat(betAmount) > parseFloat(balance) ||
            parseFloat(betAmount) == 0 ||
            parseFloat(betAmount) > 1000000
        ) {
            return;
        }
        const data = {
            bet_amount: betAmount,
            bet_position: pos,
        };
        axios.post(route("api.roulette-bet"), data).then((response) => {
            // Hier kijken of we een error hebben... bijv als de inzet te hoog is
        });
    };

    const formatValue = (value) => value.toFixed(2);

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {/*<div className="text-5xl font-bold">*/}
            {/*    {betAmount}*/}
            {/*</div>*/}
            <div className="flex flex-col items-center w-full space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        <span className="font-bold">
                            {betAmount === "" ||
                            isNaN(parseFloat(betAmount)) ? (
                                "Please enter a valid bet amount"
                            ) : parseFloat(betAmount) < 1000000 ? (
                                <>
                                    <span className="font-normal">
                                        Potential Profit:{" "}
                                    </span>
                                    $
                                    {new Intl.NumberFormat("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(parseFloat(betAmount).toFixed(2))}
                                </>
                            ) : (
                                `Max bet amount is ${new Intl.NumberFormat(
                                    "nl-NL",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ).format(1000000)}`
                            )}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("red")}
                        title={`${
                            parseFloat(betAmount) > parseFloat(balance)
                                ? "Insufficient funds"
                                : ""
                        }`}
                        className={`w-11/12 py-3 text-lg text-white bg-roulette-red rounded-xl ${
                            locked ||
                            parseFloat(betAmount) > parseFloat(balance) ||
                            parseFloat(betAmount) == 0
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        } ${
                            isNaN(parseFloat(betAmount))
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }`}
                    >
                        1 to 7
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.red}
                        </span>
                        <span>${displayedAmounts.red.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        <span className="font-bold">
                            {betAmount === "" ||
                            isNaN(parseFloat(betAmount)) ? (
                                "Please enter a valid bet amount"
                            ) : parseFloat(betAmount) < 1000000 ? (
                                <>
                                    <span className="font-normal">
                                        Potential Profit:{" "}
                                    </span>
                                    $
                                    {new Intl.NumberFormat("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(
                                        (parseFloat(betAmount) * 13).toFixed(2)
                                    )}
                                </>
                            ) : (
                                `Max bet amount is ${new Intl.NumberFormat(
                                    "nl-NL",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ).format(1000000)}`
                            )}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("green")}
                        title={`${
                            parseFloat(betAmount) > parseFloat(balance)
                                ? "Insufficient funds"
                                : ""
                        }`}
                        className={`w-11/12 py-3 text-lg text-white bg-roulette-green rounded-xl ${
                            locked ||
                            parseFloat(betAmount) > parseFloat(balance) ||
                            parseFloat(betAmount) == 0
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }
                        ${
                            isNaN(parseFloat(betAmount))
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }`}
                    >
                        0
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.green}
                        </span>
                        <span>${displayedAmounts.green.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full p-2 lg:w-1/3 bg-scamdom-40 rounded-xl">
                    <div className="py-2 text-gray-400">
                        <span className="font-bold">
                            {betAmount === "" ||
                            isNaN(parseFloat(betAmount)) ? (
                                "Please enter a valid bet amount"
                            ) : parseFloat(betAmount) < 1000000 ? (
                                <>
                                    <span className="font-normal">
                                        Potential Profit:{" "}
                                    </span>
                                    $
                                    {new Intl.NumberFormat("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(parseFloat(betAmount).toFixed(2))}
                                </>
                            ) : (
                                `Max bet amount is ${new Intl.NumberFormat(
                                    "nl-NL",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ).format(1000000)}`
                            )}
                        </span>
                    </div>
                    <button
                        onClick={() => placeBet("black")}
                        title={`${
                            parseFloat(betAmount) > parseFloat(balance)
                                ? "Insufficient funds"
                                : ""
                        }`}
                        className={`w-11/12 py-3 text-lg text-white bg-gray-500 rounded-xl  ${
                            locked ||
                            parseFloat(betAmount) > parseFloat(balance) ||
                            parseFloat(betAmount) == 0
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }
                        ${
                            isNaN(parseFloat(betAmount))
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }`}
                    >
                        8 to 14
                    </button>
                    <div className="flex justify-between w-full px-4 mt-2 text-gray-400">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> {betCounts.black}
                        </span>
                        <span>${displayedAmounts.black.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
