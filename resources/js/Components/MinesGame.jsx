import React from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MinesGame() {
    const Mineaudio = new Audio("/assets/sounds/mine_sound.ogg");
    const Gemaudio = new Audio("/assets/sounds/gem_sound.ogg");

    const [tiles, setTiles] = useState(Array(25).fill(null)); // Array to store tile type (null, 'gem', 'mine')
    const [bustedTileIndex, setBustedTile] = useState(0);
    const [gameStatus, setGameStatus] = useState("pending");
    const [betAmount, setBetAmount] = useState(0);
    const [mines, setMines] = useState(0);
    const [gems, setGems] = useState(0);
    const [winAmount, setWinAmount] = useState(0);
    const [winMultiplier, setWinMultiplier] = useState(0);
    const [cashedOut, setCashedOut] = useState(false);
    const [gameHash, setGameHash] = useState("");

    function startGame(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios
            .post(route("api.mineweeper-start"), data)
            .then((response) => {
                let input = response.data.input;
                setCashedOut(false);
                setBustedTile(0); // Reset busted tile
                setTiles(Array(25).fill(null)); // Reset all tiles
                setGameStatus("running");
                setBetAmount(input);
                setMines(response.data.mines);
                setGems(response.data.gems);
                setWinMultiplier(0);
                setWinAmount(0);
                setGameHash(response.data.hash);
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    }

    const cashOut = async (e) => {
        const data = {
            hash: gameHash,
        };
        axios.post(route("api.minesweeper-cashout"), data).then((response) => {
            const allTilePositions = response.data.all_tiles; // Get all tiles from the response
            setCashedOut(true);
            const updatedTiles = Array(25).fill(null); // Assuming there are 25 tiles total
            allTilePositions.forEach(({ type, tile_number }) => {
                updatedTiles[tile_number - 1] = type; // Map to the correct index (zero-based)
            });
            setTiles(updatedTiles); // Update state with all tiles revealed
            setGameStatus("pending");
        });
    };

    const clickTile = async (tileNumber) => {
        if (gameStatus !== "running") return;
        try {
            const response = await axios.post(route("api.click-tile"), {
                tilenum: tileNumber,
            });
            const tileType = response.data.tile_result;
            const allTilePositions = response.data.all_tiles; // Get all tiles from the response

            // Check if the tile clicked is a mine
            if (tileType === "mine") {
                // If a mine is hit, reveal all tiles
                setGameStatus("pending");

                setBustedTile(tileNumber); // Set the busted tile number
                const updatedTiles = Array(25).fill(null); // Assuming there are 25 tiles total
                allTilePositions.forEach(({ type, tile_number }) => {
                    updatedTiles[tile_number - 1] = type; // Map to the correct index (zero-based)
                });
                setTiles(updatedTiles); // Update state with all tiles revealed
                Mineaudio.play(); // Play mine sound
            } else {
                // Update the specific tile with its type if it's not a mine
                setWinAmount(response.data.total_profit);
                setWinMultiplier(response.data.winMultiplier);

                setGems(gems - 1); // Decrement gems
                setTiles((prevTiles) =>
                    prevTiles.map((tile, index) =>
                        index + 1 === tileNumber ? tileType : tile
                    )
                );
                Gemaudio.play(); // Play gem sound
            }

            console.log(`Tile ${tileNumber} is a ${tileType}`);
        } catch (error) {
            console.error("Error fetching tile type", error);
        }
    };

    const getTileImage = (tileType) => {
        if (tileType === "gem") {
            return "/assets/img/gem.png";
        } else if (tileType === "mine") {
            return "/assets/img/bust.png";
        }
        return null; // No image if tile is not yet clicked
    };

    return (
        <div className="flex flex-col-reverse w-11/12 mx-auto rounded-lg bg-slate-800 md:flex-row lg:w-9/12">
            {gameStatus === "running" && (
                <form
                    onSubmit={startGame}
                    className="flex flex-col p-3 text-sm text-white rounded-b-lg md:max-w-xs lg:rounded-l-lg lg:rounded-br-none bg-slate-700"
                >
                    <label htmlFor="bet_input" className="mb-1">
                        Bet amount
                    </label>

                    <input
                        className="mb-3 rounded-sm bg-slate-900"
                        name="bet_input"
                        value={betAmount}
                        disabled
                    />
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="gems" className="block mb-1">
                                Gems
                            </label>
                            <input
                                className="block w-full mb-3 rounded-sm bg-slate-900"
                                disabled
                                value={gems}
                                name="gems"
                                id="gems"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="mines_input" className="block mb-1">
                                Mines
                            </label>
                            <input
                                className="block w-full mb-3 rounded-sm bg-slate-900"
                                disabled
                                value={mines}
                                name="mines_input"
                                id="mines_input"
                            />
                        </div>
                    </div>
                    <label htmlFor="win_amount" className="mb-1">
                        Total profit ({winMultiplier}×)
                    </label>

                    <input
                        className="mb-3 rounded-sm bg-slate-900"
                        name="win_amount"
                        value={winAmount}
                        disabled
                    />
                    <button
                        onClick={cashOut}
                        className="w-full p-4 text-black rounded-sm bg-scamdom-primary"
                    >
                        Cash out
                    </button>
                </form>
            )}
            {gameStatus === "pending" && (
                <form
                    onSubmit={startGame}
                    className="flex flex-col p-3 text-sm text-white rounded-b-lg lg:rounded-l-lg lg:rounded-br-none bg-slate-700"
                >
                    <label htmlFor="bet_input" className="mb-1">
                        Bet amount
                    </label>

                    <input
                        className="mb-3 rounded-sm bg-slate-900"
                        type="number"
                        name="bet_input"
                        id=""
                    />

                    <label htmlFor="mines_input" className="mb-1">
                        Mines
                    </label>

                    <select
                        className="mb-3 rounded-sm bg-slate-900"
                        name="mines_input"
                        type="number"
                        id=""
                    >
                        {Array.from({ length: 24 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full p-4 text-black rounded-sm bg-scamdom-primary"
                    >
                        Bet
                    </button>
                </form>
            )}

            <div className="relative mx-auto my-auto">
                {cashedOut && (
                    <div className="absolute z-10 flex flex-col items-center gap-1 px-10 py-2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-lg bg-slate-700 top-1/2 left-1/2 border-scamdom-primary text-scamdom-primary">
                        <h3 className="text-2xl">{winMultiplier}×</h3>
                        <div className="w-5 border rounded-lg border-slate-500"></div>
                        <p className="text-xs">${winAmount}</p>
                    </div>
                )}
                <div
                    className={`grid grid-rows-5 grid-cols-5 gap-3 ${
                        cashedOut ? "opacity-50 blur-sm" : ""
                    }`}
                >
                    {Array.from({ length: 25 }, (_, index) => (
                        <button
                            key={index}
                            name={index + 1} // Start index from 1
                            onClick={() => clickTile(index + 1)} // Pass the adjusted index to clickTile
                            className={`${
                                tiles[index]
                                    ? "bg-slate-900 cursor-default" // No hover effect if clicked
                                    : "bg-gray-600 hover:bg-gray-500 hover:-translate-y-1 transition duration-200"
                            } rounded-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 relative ${
                                bustedTileIndex !== 0 &&
                                index + 1 !== bustedTileIndex // Grey out if NOT the busted tile
                                    ? "opacity-50"
                                    : "opacity-100" // Show fully opaque if it is the busted tile or not yet clicked
                            }
                            `}
                        >
                            {tiles[index] ? (
                                <img
                                    src={getTileImage(tiles[index])}
                                    alt={`Tile ${index + 1}`}
                                    className="mx-auto mb-2 size-10 sm:size-12 md:size-14 lg:size-16"
                                />
                            ) : (
                                <span className="absolute inset-0 rounded-lg shadow-[inset_0_-5px_0_0_rgba(0,0,0,0.4)]"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
