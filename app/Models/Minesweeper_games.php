<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Minesweeper_games extends Model
{
    use HasFactory;

    protected $table = 'minesweeper_games';

    protected $fillable = [
        'hash',
        'user_id',
        'bet_amount',
        'win_amount',
        'payout_multiplier',
        'mines',
        'mine_positions',
        'revealed_positions',
        'status',
        'game_ended_at',
        'last_activity_at',
        'initial_balance',
    ];

    protected $casts = [
        'mine_positions' => 'array',
        'revealed_positions' => 'array',
        'game_ended_at' => 'datetime',
        'last_activity_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
