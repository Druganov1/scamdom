<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoulletteHistory extends Model
{
    use HasFactory;

    protected $table = 'roulette_rolls';
    protected $fillable = ['color', 'number', 'hash'];

}
