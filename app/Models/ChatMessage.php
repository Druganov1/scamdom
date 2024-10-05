<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'sender_name',
        'sender_id',
        'is_mod'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
