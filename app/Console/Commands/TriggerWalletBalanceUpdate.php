<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\WalletBalanceUpdated;
use App\Events\testEvent;
use App\Models\User;

class TriggerWalletBalanceUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trigger:wallet-balance {balance} {id}';
    protected $description = 'Trigger a wallet balance update event';

    /**
     * The console command description.
     *
     * @var string
     */

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::find( $this->argument('id'));

        $balance = $this->argument('balance');

        // Trigger the event

        WalletBalanceUpdated::dispatch($balance, $user);

        $this->info("Wallet balance update triggered: $balance");
    }
}
