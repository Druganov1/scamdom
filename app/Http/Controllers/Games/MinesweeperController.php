<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Cache;
use Illuminate\Http\Request;
use App\Models\Minesweeper_games;
use Number;

class MinesweeperController extends Controller
{

    public function createGrid($minesInput) {
        $GRID_SIZE = 25;
        $numMines = $minesInput;

        // Validate the number of mines
        if ($numMines < 0 || $numMines > $GRID_SIZE - 1) {
            throw new \InvalidArgumentException("Invalid number of mines specified.");
        }

        // Initialize an array to hold the tiles
        $tiles = array_fill(0, $GRID_SIZE, 'gem'); // Fill the grid with gems initially

        // Place mines randomly in the grid
        for ($i = 0; $i < $numMines; $i++) {
            // Get a random index to place a mine
            do {
                $randomIndex = rand(0, $GRID_SIZE - 1);
            } while ($tiles[$randomIndex] === 'mine'); // Ensure no mine is placed at the same position

            // Place a mine
            $tiles[$randomIndex] = 'mine';
        }

        // Create an array to hold tile numbers
        $numberedTiles = [];
        foreach ($tiles as $index => $tile) {
            $numberedTiles[] = [
                'tile_number' => $index+1,
                'type' => $tile,
            ];
        }

        // Shuffle the numbered tiles to randomize the order
        shuffle($numberedTiles);

        return $numberedTiles; // Return the grid with mines and gems
    }


    public function StartGame(Request $request){

        // first we need to validate the request
        $request->validate([
            'bet_input' => 'required|numeric|min:0.01',
            'mines_input' => 'required|integer|min:1|max:24',
        ]);


        // then we create the mine_positions array
        $mine_positions = $this->createGrid($request->input('mines_input'));


        $game = Minesweeper_games::create([
            'hash' => md5(uniqid()),
            'user_id' => auth()->id(),
            'bet_amount' => $request->input('bet_input'),
            'mines' => $request->input('mines_input'),
            'mine_positions' => $mine_positions,
            'revealed_positions' => [],
            'status' => 'ingame',
            'last_activity_at' => now(),
            'initial_balance' => auth()->user()->balance,
        ]);

        Cache::put('minesweeper_game_' . auth()->id(), $game->hash, now()->addMinutes(30));

        return response()->json([
            'hash' => $game->hash,
        ]);
    }


    public function ClickedTile(Request $request) {
        // Retrieve the tile number from the request body
        $tilenum = $request->input('tilenum'); // Get the tile number from the request

        // Retrieve the game hash from cache
        $gamehash = Cache::get('minesweeper_game_' . auth()->id());
        $game = Minesweeper_games::where('hash', $gamehash)->first();

        // Check if the game exists
        if (!$game) {
            return response()->json([
                'message' => 'Game not found',
            ], 404);
        }

        // Check if the game is in progress
        if ($game->status !== 'ingame') {
            return response()->json([
                'message' => 'Game has ended',
            ], 400);
        }




        // Initialize variable to store the tile type
        $tileType = null;

        // Log the clicked tile number
        \Log::info("Clicked tile number: " . $tilenum);
        $game->revealed_positions = array_merge($game->revealed_positions, [$tilenum]);

        // Loop through the mine positions to find the clicked tile number
        $tile = collect($game->mine_positions)->firstWhere('tile_number', $tilenum);

        if ($tile) {
            $tileType = $tile['type'];
        } else {
            $tileType = null; // If tile isn't found, set it to null
        }


        if($tileType === 'mine') {
            $game->status = 'busted';
            $game->win_amount = 0;
            $game->payout_multiplier = 0;

        }

        // Update the last activity timestamp
        $game->last_activity_at = now();

        // Optionally, save the game state if needed
        $game->save();

        if ($game->status === 'busted') {
            Cache::forget('minesweeper_game_' . auth()->id());
            return response()->json([
                'tile_result' => $tileType,
                'all_tiles' => $game->mine_positions,

            ]);
        }
        return response()->json([
            'tile_result' => $tileType,
        ]);
    }
}
