import React, { useState } from "react";
import UserBalance from "@/Components/UserBalance.jsx";
import { Link } from "@inertiajs/react";

export default function YourBet() {
    const [betAmount, setBetAmount] = useState("0.00");
    const [userBalance, setUserBalance] = useState(500); // Standaard waarde voor de gebruikersbalans (vervang dit met de echte waarde uit UserBalance)

    const addToBet = (amount) => {
        setBetAmount((prevAmount) => (parseFloat(prevAmount) + amount).toFixed(2));
    };

    const clearBet = () => {
        setBetAmount("0.00");
    };

    const setMaxBet = () => {
        setBetAmount(UserBalance.toFixed(2)); // Zet de volledige gebruikersbalans in het invoerveld
    };

    return (
        <div className="bg-scamdom-40 rounded-lg py-4 flex max-md:flex-wrap">
            <div className="w-full flex-wrap justify-center flex items-center md:flex-row md:justify-center md:space-x-4">
                <label className="text-gray-400 text-xs mb-2 md:mb-0">Your bet</label>

                <div className="relative w-full md:max-w-xs max-md:mb-5 max-md:mx-3">
                    <input
                        placeholder="0.00"
                        value={betAmount} // Bind state aan de invoerwaarde
                        onChange={(e) => {
                            let value = e.target.value;
                            if (!isNaN(value) && value.trim() !== "") {
                                setBetAmount(parseFloat(value).toFixed(2)); // Update en rond af naar 2 decimalen
                            } else {
                                setBetAmount("0.00"); // Terug naar "0.00" als de invoer niet geldig is
                            }
                        }}
                        className="w-full text-white bg-scamdom-30 focus:ring-transparent focus:border-scamgreen-30 rounded-xl border-transparent transition duration-500 hover:border-scamgreen-30 px-4 py-2"
                    />
                    <button
                        className="absolute bg-scamdom-40 rounded-xl right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-white hover:text-scamgreen-30 transition duration-500"
                        onClick={clearBet} // Clear bet amount
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full px-4 lg:px-0 lg:justify-center lg:items-center lg:flex lg:flex-wrap">
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={() => addToBet(10)}>
                    +$10
                </button>
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={() => addToBet(50)}>
                    +$50
                </button>
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={() => addToBet(100)}>
                    +$100
                </button>
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={() => setBetAmount((betAmount / 2).toFixed(2))}>
                    1/2
                </button>
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={() => setBetAmount((betAmount * 2).toFixed(2))}>
                    x2
                </button>
                <button className="bg-scamgreen-50 px-6 py-2 rounded-md text-scamgreen-40" onClick={setMaxBet}>
                    Max
                </button>
            </div>
        </div>
    );
}
