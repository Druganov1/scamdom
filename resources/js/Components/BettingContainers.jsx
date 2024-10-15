import React, { useEffect, useState, useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { BalanceContext } from "@/Layouts/AuthenticatedLayout.jsx";
import Avatar from "react-avatar";

export function BettingContainers({ betAmount }) {
    const balance = useContext(BalanceContext);

    const [liveBets, setLiveBets] = useState([]);
    const [currentColor, setCurrentColor] = useState("");

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

    const [locked, setLocked] = useState(true);

    const resetBets = () => {
        setCurrentColor("");
        setBetCounts({ red: 0, black: 0, green: 0 });
        setBetAmounts({ red: 0, black: 0, green: 0 });
        setUniqueUsers({ red: new Set(), black: new Set(), green: new Set() });
        setDisplayedAmounts({ red: 0, black: 0, green: 0 });
        setLiveBets([]);
    };

    useEffect(() => {
        axios
            .post(route("api.roulette-getbets"))
            .then((response) => {
                const data = response.data;
                if (data.stage == "countdown") {
                    setLocked(false);
                }

                data.bets.forEach((betObj) => {
                    const betPosition = betObj.bet_position; // e.g., 'red', 'black', or 'green'
                    const username = betObj.user; // Use 'user' to get the username
                    const newBet = {
                        name: betObj.user, // User's name
                        bet_position: betObj.bet_position, // e.g., 'red', 'black', or 'green'
                        bet_amount: parseFloat(betObj.bet_amount), // Bet amount as a float
                    };

                    // Update the liveBets state with the new bet
                    setLiveBets((prevBets) => {
                        // Zoek naar een bestaande bet voor deze gebruiker
                        const existingBetIndex = prevBets.findIndex(
                            (bet) =>
                                bet.name === newBet.name &&
                                bet.bet_position === newBet.bet_position
                        );

                        // Als er al een bet is, werk die dan bij
                        if (existingBetIndex !== -1) {
                            const updatedBets = [...prevBets];
                            updatedBets[existingBetIndex].bet_amount +=
                                newBet.bet_amount; // Voeg de nieuwe bet_amount toe
                            return updatedBets;
                        } else {
                            // Anders voeg je een nieuwe bet toe
                            return [...prevBets, newBet];
                        }
                    });

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
                        newAmounts[betPosition] += parseFloat(
                            betObj.bet_amount
                        ); // Add the bet amount
                        return newAmounts; // Return the updated amounts
                    });
                });
            })
            .catch((error) => console.error("Error fetching bet data:", error));

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
                case "result":
                    setCurrentColor(data.color);
                default:
                    break;
            }
        });

        channel.listen("liveBetsRoulette", (e) => {
            const data = e.data; // This contains details of the bet from a single user
            console.log("Bet Data:", data); // Log the incoming data

            const betPosition = data.bet_position; // e.g., 'red', 'black', or 'green'
            const username = data.user; // Use 'user' to get the username

            const newBet = {
                name: data.user, // User's name
                bet_position: data.bet_position, // e.g., 'red', 'black', or 'green'
                bet_amount: parseFloat(data.bet_amount), // Bet amount as a float
            };

            // Update the liveBets state with the new bet
            setLiveBets((prevBets) => {
                // Zoek naar een bestaande bet voor deze gebruiker
                const existingBetIndex = prevBets.findIndex(
                    (bet) =>
                        bet.name === newBet.name &&
                        bet.bet_position === newBet.bet_position
                );

                // Als er al een bet is, werk die dan bij
                if (existingBetIndex !== -1) {
                    const updatedBets = [...prevBets];
                    updatedBets[existingBetIndex].bet_amount +=
                        newBet.bet_amount; // Voeg de nieuwe bet_amount toe
                    return updatedBets;
                } else {
                    // Anders voeg je een nieuwe bet toe
                    return [...prevBets, newBet];
                }
            });

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
    }, []); // Dependencies stay empty to avoid re-subscribing on every render

    useEffect(() => {
        console.log("livebets updated:", liveBets);
    }, [liveBets]); // Added displayedAmounts to dependency array

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
            <div className="flex flex-col items-start w-full space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl">
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

                    <div className={`flex flex-col w-full gap-2 mb-7`}>
                        {/* Top Bet */}
                        {liveBets.length > 0 && (
                            <>
                                {/* Vind de hoogste bet */}
                                {liveBets
                                    .filter((bet) => bet.bet_position === "red")
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer de bets van hoog naar laag
                                    .slice(0, 1) // Neem alleen de hoogste bet (de eerste)
                                    .map((topBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full p-2 space-x-2 bg-scamdom-30">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={topBet.name}
                                                        size="40"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-sm ">
                                                        <p className="text-roulette-red">
                                                            Top{" "}
                                                            {
                                                                topBet.bet_position
                                                            }
                                                        </p>
                                                        <p className="text-white">
                                                            {topBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div  className={`${
                                                    currentColor === ""
                                                        ? "text-white" // Default state when currentColor is empty
                                                        : currentColor ===
                                                        "red"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                }`}
                                                >
                                                    <p>
                                                        $
                                                        {topBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}

                        {/* Sub Bets */}
                        {liveBets.length > 1 && (
                            <>
                                {liveBets
                                    .filter((bet) => bet.bet_position === "red")
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer opnieuw om de volgorde te behouden
                                    .slice(1) // Neem de overige bets na de hoogste bet
                                    .map((subBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full px-2 space-x-2">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={subBet.name}
                                                        size="29"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-xs">
                                                        <p className="text-white">
                                                            {subBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`text-xs ${
                                                    currentColor === ""
                                                        ? "text-white" // Default state when currentColor is empty
                                                        : currentColor ===
                                                        "red"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                    }`}
                                                >
                                                    <p>
                                                        $
                                                        {subBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl">
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

                    <div className={`flex flex-col w-full gap-2 mb-7`}>
                        {/* Top Bet */}
                        {liveBets.length > 0 && (
                            <>
                                {/* Vind de hoogste bet */}
                                {liveBets
                                    .filter(
                                        (bet) => bet.bet_position === "green"
                                    )
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer de bets van hoog naar laag
                                    .slice(0, 1) // Neem alleen de hoogste bet (de eerste)
                                    .map((topBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full p-2 space-x-2 bg-scamdom-30">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={topBet.name}
                                                        size="40"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-sm ">
                                                        <p className="text-roulette-green">
                                                            Top{" "}
                                                            {
                                                                topBet.bet_position
                                                            }
                                                        </p>
                                                        <p className="text-white">
                                                            {topBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${
                                                        currentColor === ""
                                                            ? "text-white" // Default state when currentColor is empty
                                                            : currentColor ===
                                                              "green"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                    }`}
                                                >
                                                    <p>
                                                        $
                                                        {topBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}

                        {/* Sub Bets */}
                        {liveBets.length > 1 && (
                            <>
                                {liveBets
                                    .filter(
                                        (bet) => bet.bet_position === "green"
                                    )
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer opnieuw om de volgorde te behouden
                                    .slice(1) // Neem de overige bets na de hoogste bet
                                    .map((subBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full px-2 space-x-2">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={subBet.name}
                                                        size="29"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-xs">
                                                        <p className="text-white">
                                                            {subBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs ${
                                                    currentColor === ""
                                                        ? "text-white" // Default state when currentColor is empty
                                                        : currentColor ===
                                                        "green"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                }`}>
                                                    <p>
                                                        $
                                                        {subBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl">
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

                    <div className={`flex flex-col w-full gap-2 mb-7`}>
                        {/* Top Bet */}
                        {liveBets.length > 0 && (
                            <>
                                {/* Vind de hoogste bet */}
                                {liveBets
                                    .filter(
                                        (bet) => bet.bet_position === "black"
                                    )
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer de bets van hoog naar laag
                                    .slice(0, 1) // Neem alleen de hoogste bet (de eerste)
                                    .map((topBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full p-2 space-x-2 bg-scamdom-30">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={topBet.name}
                                                        size="40"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-sm ">
                                                        <p className="text-roulette-text_black">
                                                            Top{" "}
                                                            {
                                                                topBet.bet_position
                                                            }
                                                        </p>
                                                        <p className="text-white">
                                                            {topBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`${
                                                    currentColor === ""
                                                        ? "text-white" // Default state when currentColor is empty
                                                        : currentColor ===
                                                        "black"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                }`}>
                                                    <p>
                                                        $
                                                        {topBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}

                        {/* Sub Bets */}
                        {liveBets.length > 1 && (
                            <>
                                {liveBets
                                    .filter(
                                        (bet) => bet.bet_position === "black"
                                    )
                                    .sort((a, b) => b.bet_amount - a.bet_amount) // Sorteer opnieuw om de volgorde te behouden
                                    .slice(1) // Neem de overige bets na de hoogste bet
                                    .map((subBet, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between w-full px-2 space-x-2">
                                                <div className="flex gap-1.5">
                                                    <Avatar
                                                        name={subBet.name}
                                                        size="29"
                                                        round={true}
                                                        textSizeRatio={1.75}
                                                    />
                                                    <div className="flex flex-col justify-center text-xs text-sm">
                                                        <p className="text-white">
                                                            {subBet.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs ${
                                                    currentColor === ""
                                                        ? "text-white" // Default state when currentColor is empty
                                                        : currentColor ===
                                                        "black"
                                                            ? "text-roulette-green" // Profit (green) state
                                                            : "text-red-600" // Loss (red) state
                                                }`}>
                                                    <p>
                                                        $
                                                        {subBet.bet_amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
