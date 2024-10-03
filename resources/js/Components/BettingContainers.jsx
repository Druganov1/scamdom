import React from "react";

export function BettingContainers() {
    return (
        <div className="justify-center flex space-x-5">
            <div className="space-x-2 bg-scamdom-40 rounded-xl py-40">
                <button className="text-white px-52 bg-roulette-red">1 to 7</button>
            </div>
            <div className="space-x-2 bg-scamdom-40 rounded-xl py-40 ">
                <button className="text-white bg-roulette-green px-52">0</button>
            </div>
            <div className="space-x-2 bg-scamdom-40 rounded-xl py-40">
                <button className="bg-gray-500 text-white px-52">8 to 14</button>
            </div>
        </div>
    )
}
