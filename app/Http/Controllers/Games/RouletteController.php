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



    public static function announceResults($pos){
        $hash = Cache::get('rouletteGameHash');
        $bets = Cache::get('bets_' . $hash, []);

        foreach ($bets as $bet) {
            $dbBet = Bets::where('user_id', $bet['user_id'])->where('game_id', $hash)->first();
            if ($bet['bet_position'] == $pos) {
                \Log::info(json_encode("WINNER WINNER"));

                $user = User::where('id', $bet['user_id'])->first();
                $take_home = 0;
                $profit= 0;
                $multiplier = 0;
                switch($pos){
                    case "green":

                        $profit = $bet['bet_amount'] * 13;
                        $multiplier = 13;

                        break;
                    default:
                        $profit = $bet['bet_amount'] * 2;
                        $multiplier = 2;

                }

                $dbBet->status = "completed";
                $dbBet->win_amount = $profit;
                $dbBet->win_multiplier = $multiplier;
                $dbBet->save();
                $take_home = $user->balance + $profit;
                BalanceController::updateBalance($take_home, $user);

            } else {
                $dbBet->status = "completed";
                $dbBet->win_amount = 0;
                $dbBet->win_multiplier = 0;
                $dbBet->save();
            }
        }
    }

    public static function setGameHash($hash){
        self::$gameHash = $hash;
        Cache::put('rouletteGameHash', $hash, 300); // Store in cache for 5 minutes
        }

    public function placeBet(request $request){
        $bet_amount = $request->input('bet_amount');
        $bet_position = $request->input('bet_position');
        $initial_balance = auth()->user()->balance;
        $hash = Cache::get('rouletteGameHash');

        if ($bet_amount > $initial_balance) {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        $this->details = json_encode([
            'hash' => $hash,
            'bet_amount' => $request->input('bet_amount'),
            'bet_position' => $request->input('bet_position'),
        ]);

        Bets::create([
            'user_id' => auth()->id(),
            'bet_amount' => $bet_amount,
            'bet_time' => now(),
            'game_type' => 'Roulette',
            'details' => $this->details,
            'status' => 'pending',
            'game_id' => $hash,
            'initial_balance' => $initial_balance
        ]);


        $betDetails = [
            'user_id' => auth()->id(),
            'bet_amount' => $bet_amount,
            'bet_position' => $bet_position,
        ];

        $betDetailsPublic = [
            'user' => auth()->user()->name,
            'bet_amount' => $bet_amount,
            'bet_position' => $bet_position,
        ];
        $bets = Cache::get('bets_' . $hash, []);

        // Add the new bet to the array
        $bets[] = $betDetails;

        // Store the updated bets array back in cache
        Cache::put('bets_' . $hash, $bets, 300); // Cache for 5 minutes


        $newBalance = $initial_balance - $bet_amount;
        BalanceController::updateBalance($newBalance, auth()->user());
        liveBetsRoulette::dispatch($betDetailsPublic);

        return response()->json([
            'hash' => $bets
        ]);

    }
}
