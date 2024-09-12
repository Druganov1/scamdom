<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\WalletBalanceUpdated;

class TriggerWalletBalanceUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trigger:wallet-balance {balance}';
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
        $balance = $this->argument('balance');

        // Trigger the event

        // WalletBalanceUpdated::dispatch($balance);

        broadcast(new WalletBalanceUpdated($balance));
        $this->info("Wallet balance update triggered: $balance");
    }
}
