<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bets;
use App\Http\Controllers\BalanceController;
use App\Events\liveBetsRoulette;
use App\Models\User;
use Illuminate\Support\Facades\Cache;



class RouletteController extends Controller
{
    public static $gameHash;

    public function getBets(){
        $hash = Cache::get('rouletteGameHash');
        $bets = Cache::get('previous_bets_' . $hash, []);
        $currentStage = Cache::get('current_game_stage');


        return response()->json([
            'bets' => $bets,
            'stage' => $currentStage
        ]);
    }


    public static function announceResults($pos) {
        $hash = Cache::get('rouletteGameHash');
        $bets = Cache::get('bets_' . $hash, []);

        // Loop through each user's bets directly
        foreach ($bets as $user_id => $userBets) {
            // Check if there are bets for this user
            if (!isset($userBets)) {
                continue; // Skip if no bets
            }

            // Retrieve the user's bet for the specified position, if it exists
            $bet = isset($userBets[$pos]) ? $userBets[$pos] : null;
            $dbBet = Bets::where('user_id', $user_id)->where('game_id', $hash)->first();

            if ($bet) {
                // User is a winner

                $user = User::where('id', $user_id)->first();
                $take_home = 0;
                $profit = 0;
                $multiplier = 0;

                switch ($pos) {
                    case "green":
                        $profit = $bet['bet_amount'] * 13;
                        $multiplier = 13;
                        break;
                    default:
                        $profit = $bet['bet_amount'] * 2;
                        $multiplier = 2;
                }

                // Update the bet record
                $dbBet->status = "completed";
                $dbBet->win_amount = $profit;
                $dbBet->win_multiplier = $multiplier;
                $dbBet->save();

                // Update user's balance
                $take_home = $user->balance + $profit;
                BalanceController::updateBalance($take_home, $user);
            } else {
                // Update as completed with no winnings
                if ($dbBet) {
                    $dbBet->status = "completed";
                    $dbBet->win_amount = 0;
                    $dbBet->win_multiplier = 0;
                    $dbBet->save();
                }
            }
        }
    }


    public static function setGameHash($hash){
        self::$gameHash = $hash;
        Cache::put('rouletteGameHash', $hash, 300); // Store in cache for 5 minutes
        }

        public function placeBet(Request $request) {
            $game_state = Cache::get('current_game_stage');

            if ($game_state !== 'countdown') {
                return response()->json([
                    'message' => 'Game is already in progress'
                ], 400);
            }

            $bet_amount = $request->input('bet_amount');
            $bet_position = $request->input('bet_position');
            $initial_balance = auth()->user()->balance;
            $hash = Cache::get('rouletteGameHash');
            $bets = Cache::get('bets_' . $hash, []);
            $user_id = auth()->id();

            if ($bet_amount > $initial_balance) {
                return response()->json([
                    'message' => 'Insufficient balance'
                ], 400);
            }

            // Initialize user's bet details if not set
            if (!isset($bets[$user_id])) {
                $bets[$user_id] = [];
            }

            // Check if a bet already exists for this position
            $existingBet = isset($bets[$user_id][$bet_position]);

            if ($existingBet) {
                // Update existing bet amount
                $bets[$user_id][$bet_position]['bet_amount'] += $bet_amount;
            } else {
                // Initialize new bet details
                $bets[$user_id][$bet_position] = [
                    'username' => auth()->user()->name,
                    'bet_amount' => $bet_amount,
                    'bet_position' => $bet_position,
                ];
            }

            // Update the bet in the database
            Bets::updateOrCreate(
                [
                    'user_id' => $user_id,
                    'game_id' => $hash,
                    'details->bet_position' => $bet_position // JSON field query
                ],
                [
                    'bet_amount' => $existingBet ? $bets[$user_id][$bet_position]['bet_amount'] : $bet_amount,
                    'details' => json_encode([
                        'hash' => $hash,
                        'bet_amount' => $existingBet ? $bets[$user_id][$bet_position]['bet_amount'] : $bet_amount,
                        'bet_position' => $bet_position
                    ]),
                    'bet_time' => now(),
                    'game_type' => 'Roulette',
                    'status' => 'pending',
                    'initial_balance' => $initial_balance
                ]
            );

            // Store the updated bets array back in cache
            Cache::put('bets_' . $hash, $bets, 300); // Cache for 5 minutes

            // Update user balance
            $newBalance = $initial_balance - $bet_amount;
            BalanceController::updateBalance($newBalance, auth()->user());

            $position = [
                'user' => auth()->user()->name,
                'bet_amount' => $bet_amount,
                'bet_position' => $bet_position
            ];
            $existing_positions = Cache::get('previous_bets_' . $hash, []);

            // Append the new position to the array

            $existing_positions[] = $position;

            // Store the updated array back in the cache
            Cache::put('previous_bets_' . $hash, $existing_positions, 300);
            // Prepare public bet details for live updates
            liveBetsRoulette::dispatch($position);

            return response()->json([
                'data' => $bets,
                'message' => 'Bet placed successfully']);
        }

}
