<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Cache;
use Illuminate\Http\Request;
use App\Models\Minesweeper_games;
use Number;
use App\Models\Bets;
use App\Http\Controllers\BalanceController;



class MinesweeperController extends Controller
{


    public $details;
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
        $gamehash = Cache::get('minesweeper_game_' . auth()->id());
        $game = Minesweeper_games::where('hash', $gamehash)->first();
        if ($game) {
            $game->status = 'abandoned';
            $game->game_ended_at = $game->last_activity_at;
            $game->win_amount = 0;
            $game->payout_multiplier = 0;
            $game->save();
        }


        $initial_balance = auth()->user()->balance;
        // first we need to validate the request
        $request->validate([
            'bet_input' => 'required|numeric|min:0.01',
            'mines_input' => 'required|min:1|max:24',
        ]);


        // then we create the mine_positions array
        $mine_positions = $this->createGrid($request->input('mines_input'));

        $newBalance = auth()->user()->balance +- $request->input('bet_input');
        BalanceController::updateBalance($newBalance, auth()->user());

        $game = Minesweeper_games::create([
            'hash' => md5(uniqid()),
            'user_id' => auth()->id(),
            'bet_amount' => $request->input('bet_input'),
            'mines' => $request->input('mines_input'),
            'mine_positions' => $mine_positions,
            'revealed_positions' => [],
            'status' => 'ingame',
            'last_activity_at' => now(),
            'initial_balance' => $initial_balance
        ]);

        Cache::put('minesweeper_game_' . auth()->id(), $game->hash, now()->addMinutes(30));

        $this->details = json_encode([
            'hash' => $game->hash,
            'input' => $request->input('bet_input'),
            'mines' => $request->input('mines_input'),
            'gems' => (25 - $request->input('mines_input')),
            'mine_positions' => $mine_positions,
            'initial_balance' => $initial_balance
        ]);

        Bets::create([
            'user_id' => auth()->id(),
            'bet_amount' => $request->input('bet_input'),
            'bet_time' => now(),
            'game_type' => 'mines',
            'details' => $this->details,
            'status' => 'pending',
            'game_id' => $game->hash,
            'initial_balance' => $initial_balance
        ]);
        return response()->json([
            'hash' => $game->hash,
            'input' => $request->input('bet_input'),
            'mines' => $request->input('mines_input'),
            'gems' => (25 - $request->input('mines_input')),
        ]);


    }

    public function factorial($n) {
        if ($n <= 1) {
            return 1;
        }
        return $n * $this->factorial($n - 1);
    }

    // Combination function C(n, k) = n! / (k! * (n - k)!)
    public function combination($n, $k) {
        return $this->factorial($n) / ($this->factorial($k) * $this->factorial($n - $k));
    }

    // Updated multiplier function
// Updated multiplier function with scaling factor and formatting
public function getWinMultiplier($mines, $tilesClicked) {
    $totalTiles = 25;  // Total number of tiles in the grid (5x5)
    $safeTiles = $totalTiles - $mines;  // Initial safe tiles

    // Calculate the probability of success with the remaining safe tiles
    $multiplier = $this->combination($safeTiles, $tilesClicked) / $this->combination($totalTiles, $tilesClicked);

    // Inverse of the probability of success
    $winMultiplier = 1 / $multiplier;

    // Apply a scaling factor to render the multiplier down
    $scalingFactor = 0.99; // Adjust this factor to decrease the multiplier slightly
    $winMultiplier *= $scalingFactor;

    // Round down to 2 decimal places
    return floor($winMultiplier * 100) / 100.0; // Return as a float
}



    public function cashOut(Request $request) {
        $gamehash = Cache::get('minesweeper_game_' . auth()->id());
        $game = Minesweeper_games::where('hash', $gamehash)->first();

        if (!$game) {
            return response()->json([
                'message' => 'Game not found'
            ], 404);
        }

        if ($game->status === 'finished') {
            return response()->json([
                'message' => 'Game is finished'
            ], 400);
        }
        $winMultiplier = $this->getWinMultiplier($game->mines, count($game->revealed_positions));

        $multiplier = $game->bet_amount * $winMultiplier;
        $totalProfit = round($multiplier-$game->bet_amount, 2);

        $bet = Bets::where('game_id', $game->hash)->first();
        $bet->status = 'completed';
        $bet->win_amount = $totalProfit;
        $bet->win_multiplier = $winMultiplier;
        $bet->save();

        $game->win_amount = $totalProfit;
        $game->payout_multiplier = $winMultiplier;
        $game->status = 'finished';
        $game->game_ended_at = now();
        $game->save();

        $newBalance = auth()->user()->balance += ($totalProfit + $game->bet_amount);


        BalanceController::updateBalance($newBalance, auth()->user());

        return response()->json([
            'all_tiles' => $game->mine_positions,

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
            $game->last_activity_at = now();
            $game->game_ended_at = now();

            $game->save();

            // Update the bet status to 'completed', but set the win amount and multiplier to 0
            $bet = Bets::where('game_id', $game->hash)->first();
            $bet->status = 'completed';
            $bet->win_amount = 0;
            $bet->win_multiplier = 0;
            $bet->save();
            return response()->json([
                'tile_result' => $tileType,
                'all_tiles' => $game->mine_positions,

            ]);
        }

        // Update the last activity timestamp
        $game->last_activity_at = now();

        // Optionally, save the game state if needed
        $game->save();
        $winMultiplier = $this->getWinMultiplier($game->mines, count($game->revealed_positions));


        $multiplier = $game->bet_amount * $winMultiplier;
        $totalProfit = round($multiplier-$game->bet_amount, 2);


        return response()->json([
            'tile_result' => $tileType,
            'total_profit' => $totalProfit,
            'winMultiplier' => $winMultiplier,
        ]);
    }
}
