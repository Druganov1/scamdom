<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('wallet-balance.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});



Broadcast::channel('testChannel', function () {
    return true; // Adjust authorization logic as needed
});

