// GamesCatalog
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
export default function GamesCatalog() {
    return (
        <div className="py-12">
            <div className="bg-background p-6">
                <h1 className="text-2xl font-bold text-white mb-4">
                <i className="fa-solid fa-chess-rook mr-3" style={{color: '#06bf67'}}></i>

                    Scamdom Originals
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-[15px]">
                <button className="bg-slot text-white py-12 h-12 px-9 rounded-lg flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1">
  <i className="fa-light fa-chess-rook p-3"></i>
  Slot Battles
</button>

                    <button className="bg-plinko text-white py-12 h-12 px-9 rounded-lg flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1 ">
                    <i className="fa-light fa-chess-rook p-3"></i>

                        Plinko
                    </button>
                    <button className="bg-crash text-white py-12 h-12 px-9 rounded-lg flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1 ">
                    <i className="fa-light fa-chess-rook p-3"></i>

                        Crash
                    </button>
                    <Link href={route('games.roulette')} className="bg-roulette text-white py-12 h-12 px-9 rounded-lg flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1 ">
                    <i className="fa-light fa-chess-rook p-3"></i>

                        Roulette
                    </Link>
                    <button className="bg-hilo text-white py-12 h-12 px-9 rounded-lg flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1">
                    <i className="fa-light fa-chess-rook p-3"></i>

                        HiLo
                    </button>

                </div>
            </div>
        </div>
    );
}
