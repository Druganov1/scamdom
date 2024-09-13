<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\WalletBalanceUpdated;
use App\Models\User;

class BalanceController extends Controller
{
    public function addFunds(Request $request)
    {
        $user = $request->user();
        $amount = $request->amount;
        $user->balance += $amount;
        $user->save();


        WalletBalanceUpdated::dispatch($user->balance, $user);

        return response()->json(['message' => 'Funds added successfully']);
    }
}
