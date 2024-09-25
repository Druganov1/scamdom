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

    function startGame(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios.post(route("api.mineweeper-start"), data).then((response) => {
            console.log(response.data);
        });
    }

    const clickTile = async (tileNumber) => {
        try {
            const response = await axios.post(route("api.click-tile"), {
                tilenum: tileNumber,
            });
            const tileType = response.data.tile_result;
            const allTilePositions = response.data.all_tiles; // Get all tiles from the response

            // Check if the tile clicked is a mine
            if (tileType === "mine") {
                // If a mine is hit, reveal all tiles
                setBustedTile(tileNumber); // Set the busted tile number
                const updatedTiles = Array(25).fill(null); // Assuming there are 25 tiles total
                allTilePositions.forEach(({ type, tile_number }) => {
                    updatedTiles[tile_number - 1] = type; // Map to the correct index (zero-based)
                });
                setTiles(updatedTiles); // Update state with all tiles revealed
                Mineaudio.play(); // Play mine sound
            } else {
                // Update the specific tile with its type if it's not a mine
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
        <div className="bg-slate-800 rounded-lg flex-col-reverse md:flex-row flex w-11/12 lg:w-9/12 mx-auto">
            <form
                onSubmit={startGame}
                className="flex flex-col text-white text-sm rounded-b-lg lg:rounded-l-lg lg:rounded-br-none  bg-slate-700 p-3"
            >
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

                <button
                    type="submit"
                    className="bg-scamdom-primary text-black w-full rounded-sm p-4"
                >
                    Bet
                </button>
            </form>

            <div className="mx-auto my-auto">
                <div className="grid grid-rows-5 grid-cols-5 gap-3">
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
                            }`}
                        >
                            {tiles[index] ? (
                                <img
                                    src={getTileImage(tiles[index])}
                                    alt={`Tile ${index + 1}`}
                                    className="size-10 mx-auto mb-2 sm:size-12 md:size-14 lg:size-16"
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
