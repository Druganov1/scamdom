import React from "react";

export function BettingContainers() {
    return (
        <div className="justify-center md:space-x-5 flex flex-col md:flex-row">
            <div className="bg-scamdom-40 rounded-xl mx-auto justify-center items-center w-1/3">
                <button className="text-white bg-roulette-red w-11/12 rounded-xl">1 to 7</button>
            </div>
            <div className="bg-scamdom-40 rounded-xl w-1/3">
                <button className="text-white bg-roulette-green w-11/12 rounded-xl">0</button>
            </div>
            <div className="bg-scamdom-40 rounded-xl w-1/3">
                <button className="bg-gray-500 text-white w-11/12 rounded-xl">8 to 14</button>
            </div>
        </div>
    )
}
