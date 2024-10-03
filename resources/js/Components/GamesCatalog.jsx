// GamesCatalog
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
export default function GamesCatalog() {
    return (
        <div className="py-12">
            <div className="p-6 bg-background">
                <h1 className="mb-4 text-2xl font-bold text-white">
                    <i
                        className="mr-3 fa-solid fa-chess-rook"
                        style={{ color: "#06bf67" }}
                    ></i>
                    Scamdom Originals
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-[15px]">
                    <Link
                        href={route("games.mines")}
                        className="flex items-center justify-center h-12 py-12 text-2xl text-white transition-transform duration-200 rounded-lg bg-slot px-9 hover:-translate-y-1"
                    >
                        <i className="p-3 fa-light fa-chess-rook"></i>
                        Mines
                    </Link>

                    <div className="relative flex items-center justify-center h-12 py-12 text-2xl text-white transition-transform duration-200 rounded-lg cursor-not-allowed bg-plinko px-9">
                        <i className="p-3 fa-light fa-chess-rook"></i>
                        Plinko
                        <div className="absolute flex flex-col justify-center w-full h-full bg-gray-400 bg-opacity-50 rounded-xl ">
                            <p className="font-semibold text-center text-black">
                                Unavailible
                            </p>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center h-12 py-12 text-2xl text-white transition-transform duration-200 rounded-lg cursor-not-allowed bg-crash px-9">
                        <i className="p-3 fa-light fa-chess-rook"></i>
                        Crash
                        <div className="absolute flex flex-col justify-center w-full h-full bg-gray-400 bg-opacity-50 rounded-xl ">
                            <p className="font-semibold text-center text-black">
                                Unavailible
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route("games.roulette")}
                        className="flex items-center justify-center h-12 py-12 text-2xl text-white transition-transform duration-200 rounded-lg bg-roulette px-9 hover:-translate-y-1 "
                    >
                        <i className="p-3 fa-light fa-chess-rook"></i>
                        Roulette
                    </Link>
                    <div className="relative flex items-center justify-center h-12 py-12 text-2xl text-white transition-transform duration-200 rounded-lg cursor-not-allowed bg-hilo px-9">
                        <i className="p-3 fa-light fa-chess-rook"></i>
                        HiLo
                        <div className="absolute flex flex-col justify-center w-full h-full bg-gray-400 bg-opacity-50 rounded-xl ">
                            <p className="font-semibold text-center text-black">
                                Unavailible
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
