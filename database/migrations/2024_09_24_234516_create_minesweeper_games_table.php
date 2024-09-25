<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('minesweeper_games', function (Blueprint $table) {
            $table->id();
            $table->string('hash')->unique(); // Unique game identifier to prevent tampering
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to the user
            $table->decimal('bet_amount', 10, 2); // Bet placed by the user
            $table->decimal('win_amount', 10, 2)->nullable(); // Win amount (when player cashes out)
            $table->decimal('payout_multiplier', 8, 4)->nullable(); // Store the final multiplier used for payout
            $table->integer('mines'); // Number of mines for the game
            $table->json('mine_positions'); // Store positions of mines (JSON)
            $table->json('revealed_positions')->nullable(); // Positions revealed by the player (JSON)
            $table->enum('status', ['ingame', 'busted', 'finished', 'abandoned'])->default('ingame'); // Game state
            $table->timestamp('game_ended_at')->nullable(); // Time when the game ended
            $table->timestamp('last_activity_at')->nullable(); // Time of the player's last interaction (for timeouts)
            $table->decimal('initial_balance', 10, 2); // Store the user's balance when the game started
            $table->timestamps(); // Created at and updated at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minesweeper_games');
    }
};
