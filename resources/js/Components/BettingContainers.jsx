import React from "react";

export function BettingContainers() {
    return (
        <div className="flex flex-col justify-center md:space-x-5 md:flex-row">
            <div className="flex justify-center w-full md:w-1/3 bg-scamdom-40 rounded-xl">
                <button className="w-11/12 text-white bg-roulette-red rounded-xl">
                    1 to 7
                </button>
            </div>
            <div className="flex justify-center w-full md:w-1/3 bg-scamdom-40 rounded-xl">
                <button className="w-11/12 text-white bg-roulette-green rounded-xl">
                    0
                </button>
            </div>
            <div className="flex justify-center w-full md:w-1/3 bg-scamdom-40 rounded-xl">
                <button className="w-11/12 text-white bg-gray-500 rounded-xl">
                    8 to 14
                </button>
            </div>
        </div>
    );
}
