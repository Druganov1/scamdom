<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bets extends Model
{
    use HasFactory;

    protected $table = "bets";


    protected $fillable = [
        'user_id',
        'bet_amount',
        'win_amount',
        'win_multiplier',
        'bet_time',
        'game_type',
        'details',
        'status',
        'game_id',
        'initial_balance'
    ];
}
