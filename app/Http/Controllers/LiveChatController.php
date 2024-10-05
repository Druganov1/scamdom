<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\NewChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Models\ChatMessage;
class LiveChatController extends Controller
{
    public function newChat(request $request){

        $chatMessage = ChatMessage::create([
            'message' => $request->input('message'),
            'sender_id' => Auth::user()->id,
            'sender_name' => Auth::user()->name,
            'is_mod' => Auth::user()->is_mod
        ]);

        // Dispatch the WebSocket event with the newly created message

        NewChatMessage::dispatch($chatMessage);


    }

    public function init()
    {
        // Retrieve the last 100 messages from the database
        return ChatMessage::orderBy('created_at', 'asc')->take(100)->get()->reverse();
    }
}
