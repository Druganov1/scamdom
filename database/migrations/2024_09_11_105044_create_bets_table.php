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
        Schema::create('bets', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('user_id'); // Foreign key for users
            $table->decimal('bet_amount', 15, 2); // Amount of the bet
            $table->decimal('win_amount', 15, 2)->nullable(); // Amount won from the bet
            $table->decimal('win_multiplier', 8, 2)->nullable(); // Multiplier of the win
            $table->timestamp('bet_time')->useCurrent(); // Time of the bet
            $table->string('game_type')->nullable(); // Type of game or bet
            $table->text('details')->nullable(); // Additional details about the bet
            $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending'); // Status of the bet

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
            Schema::dropIfExists('bets');
    }
};
