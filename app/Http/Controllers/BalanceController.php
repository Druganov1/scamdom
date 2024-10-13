<?php

namespace App\Http\Controllers;

use App\Models\Deposits;
use Illuminate\Http\Request;
use App\Events\WalletBalanceUpdated;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BalanceController extends Controller
{

    public $MAX_DAILY_DEPOSIT_TOTAL = 300;

    private function CheckDailyDeposit($user){

        // we check how much the user has deposited today


        $todayDeposits = Deposits::where('user_id', $user->id)
            ->whereDate('created_at', now()->toDateString())
            ->sum('amount');

        return $todayDeposits;
    }
    public function addFunds(Request $request)
    {
        $user = $request->user();
        $amount = $request->amount;

        if($this->CheckDailyDeposit($user) == $this->MAX_DAILY_DEPOSIT_TOTAL){
        return response()->json(['message' => "Je hebt het maximale daglimiet van \${$this->MAX_DAILY_DEPOSIT_TOTAL} voor stortingen bereikt."], 403);
        }

        $user->balance += $amount;
        $user->save();

        Deposits::create([
            'user_id' => $user->id,
            'amount' => $amount,

        ]);
        $this->updateBalance($user->balance, $user);




        return response()->json(['message' => 'Saldo opgewaardeerd!'], 200);
    }


    public static function updateBalance($amount, User $user){
        WalletBalanceUpdated::dispatch($amount, $user);
        $user->balance = $amount;
        $user->save();


    }
    public function getUserBalance(){

        $user = Auth::user();
        return [
            "balance" => $user->balance
        ];
    }
}
