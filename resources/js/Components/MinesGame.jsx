import React from "react";

export default function MinesGame() {
    return (
        <div className="bg-slate-800 rounded-lg flex-col-reverse md:flex-row flex h-[73dvh]   w-11/12 lg:w-9/12 mx-auto">
            <div className="flex flex-col text-white text-sm rounded-b-lg lg:rounded-l-lg lg:rounded-br-none  bg-slate-700 p-3">
                <label htmlFor="bet_input" className="mb-1">
                    Bet amount
                </label>

                <input
                    className="bg-slate-900 rounded-sm mb-3"
                    type="number"
                    name="bet_input"
                    id=""
                />

                <label htmlFor="mines_input" className="mb-1">
                    Mines
                </label>

                <input
                    className="bg-slate-900 rounded-sm mb-3"
                    type="number"
                    name="mines_input"
                    id=""
                />

                <button className="bg-scamdom-primary text-black w-full rounded-sm p-4">
                    Bet
                </button>
            </div>
            <div className="mx-auto my-auto">
                <div className="grid grid-rows-5 grid-cols-5 gap-3">
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <img
                            src="/assets/img/gem.png"
                            alt=""
                            class="size-10 mx-auto mb-2 sm:size-12 md:size-14 lg:size-16"
                        />
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <img
                            src="/assets/img/bust.png"
                            alt=""
                            class="size-10 mx-auto mb-2 sm:size-12 md:size-14 lg:size-16"
                        />
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200 rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative">
                        <span class="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
