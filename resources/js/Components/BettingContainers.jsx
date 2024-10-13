import React from "react";
import { FaUsers } from "react-icons/fa";


export function BettingContainers() {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <div className="flex flex-col lg:flex-row lg:space-x-5 w-full items-center space-y-5 lg:space-y-0">
                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl p-2">
                    <div className="text-gray-400 py-2">
                        Potential Profit: <span className="font-bold">$0.00</span>
                    </div>
                    <button className="w-11/12 text-white bg-roulette-red rounded-xl py-3 text-lg">
                        1 to 7
                    </button>
                    <div className="flex justify-between w-full mt-2 text-gray-400 px-4">
                <span className="flex items-center">
                    <FaUsers /> 0
                </span>
                        <span>$0.00</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl p-2">
                    <div className="text-gray-400 py-2">
                        Potential Profit: <span className="font-bold">$0.00</span>
                    </div>
                    <button className="w-11/12 text-white bg-roulette-green rounded-xl py-3 text-lg">
                        0
                    </button>
                    <div className="flex justify-between w-full mt-2 text-gray-400 px-4">
                <span className="flex items-center">
                    <FaUsers /> 0
                </span>
                        <span>$0.00</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-scamdom-40 rounded-xl p-2">
                    <div className="text-gray-400 py-2">
                        Potential Profit: <span className="font-bold">$0.00</span>
                    </div>
                    <button className="w-11/12 text-white bg-gray-500 rounded-xl py-3 text-lg">
                        8 to 14
                    </button>
                    <div className="flex justify-between w-full mt-2 text-gray-400 px-4">
                <span className="flex items-center">
                    <FaUsers /> 0
                </span>
                        <span>$0.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
