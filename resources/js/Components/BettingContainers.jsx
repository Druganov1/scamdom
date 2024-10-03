import React from "react";

export function BettingContainers() {
    return (
        <div className="justify-center flex space-x-5 flex-col md:flex-row">
            <div className="space-x-2 bg-scamdom-40 rounded-xl">
                <button className="text-white bg-roulette-red">1 to 7</button>
            </div>
            <div className="space-x-2 bg-scamdom-40 rounded-xl ">
                <button className="text-white bg-roulette-green">0</button>
            </div>
            <div className="space-x-2 bg-scamdom-40 rounded-xl">
                <button className="bg-gray-500 text-white">8 to 14</button>
            </div>
        </div>
    )
}
