<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Events\RouletteService;

class RouletteTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:roulette';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start roulette timer';

    public function __construct()
    {
        parent::__construct();
    }



    /**
     * Execute the console command.
     */

     private function weightedRandomRoulette()
     {
   // Define the roulette numbers with their weights
   $rouletteNumbers = [
    ['number' => 1, 'weight' => 1],
    ['number' => 14, 'weight' => 1],
    ['number' => 2, 'weight' => 1],
    ['number' => 13, 'weight' => 1],
    ['number' => 3, 'weight' => 1],
    ['number' => 12, 'weight' => 1],
    ['number' => 4, 'weight' => 1],
    ['number' => 0, 'weight' => 0.1], // Very uncommon
    ['number' => 11, 'weight' => 1],
    ['number' => 5, 'weight' => 1],
    ['number' => 10, 'weight' => 1],
    ['number' => 6, 'weight' => 1],
    ['number' => 9, 'weight' => 1],
    ['number' => 7, 'weight' => 1],
    ['number' => 8, 'weight' => 1],
];

// Create an array with the weighted numbers
$weightedNumbers = [];
foreach ($rouletteNumbers as $item) {
    for ($i = 0; $i < $item['weight'] * 10; $i++) {
        $weightedNumbers[] = $item['number'];
    }
}

// Randomly select a number from the weighted array
$randomIndex = array_rand($weightedNumbers);
return $weightedNumbers[$randomIndex];
}

    public function handle()
    {
        while (true) {
            // Wait for 20 seconds before running again
            $num = $this->weightedRandomRoulette();
            RouletteService::dispatch($num);
            $this->info("sent roulette event");

            sleep(30);
        }
    }
}
