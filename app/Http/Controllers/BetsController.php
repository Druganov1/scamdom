<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bets;
use Inertia\Inertia;

class BetsController extends Controller
{
    public function show(){
        $bets = Bets::where('user_id', auth()->id())->orderByDesc('bet_time')->get();
        return Inertia::render('Profile/Bets', [
            'bets' => $bets
        ]);

    }
}
