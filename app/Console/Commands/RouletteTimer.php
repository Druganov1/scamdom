<?php

namespace App\Console\Commands;

use App\Models\RoulletteHistory;
use Illuminate\Console\Command;

use App\Events\RouletteService;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\Games\RouletteController;

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

    public $startTime;
    public $gameResult;
    public $currentStage;
    public $timeAtSpin;
    public $_COUNTDOWN_MSEC = 15000;

    public function init()
    {
        $cachedStartTime = Cache::get('roulette_start_time');
        $cachedGameResult = Cache::get('roulette_game_result');
        $currentStage = Cache::get('current_game_stage');
        $last_rolls = RoulletteHistory::orderBy('created_at', 'desc')->take(10)->pluck('number');
        \Log::info($currentStage); // als deze hier niet is dan werkt het helemaal niet bruh

        if (!$cachedStartTime || !$cachedGameResult || !$currentStage) {
            return [
                'gameResult' => null,
                'remainingTime' => null,
                'currentStage' => $currentStage,
                'last_rolls' => $last_rolls,
            ];
        }

        $currentTime = time();
        $elapsedTime = $currentTime - $cachedStartTime;

        $stageDurations = [
            'countdown' => 15,
            'spin' => 6,
            'result' => 6,
        ];

        // Determine the current stage and calculate remaining time
        $remainingTime = null;
        $stageStartTime = $elapsedTime;

        if ($currentStage === 'countdown') {
            $remainingTime = max(0, ($stageDurations['countdown'] - $elapsedTime) * 1000); // Convert to milliseconds
            $timeAtSpin = null;
        } elseif ($currentStage === 'spin') {
            $stageStartTime -= $stageDurations['countdown'];
            $remainingTime = max(0, ($stageDurations['spin'] - ($elapsedTime - $stageStartTime)) * 1000); // Convert to milliseconds
            $timeAtSpin = Cache::get('time_at_spin');
        } elseif ($currentStage === 'result') {
            $stageStartTime -= $stageDurations['countdown'] + $stageDurations['spin'];
            $remainingTime = max(0, ($stageDurations['result'] - ($elapsedTime - $stageStartTime)) * 1000); // Convert to milliseconds
            $timeAtSpin = null;
        }

        return [
            'timeAtSpin' => $timeAtSpin,
            'gameResult' => $cachedGameResult,
            'remainingTime' => $remainingTime,
            'currentStage' => $currentStage,
            'last_rolls' => $last_rolls,
        ];
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
            ['number' => 0, 'weight' => 0.3], // Very uncommon
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
            // first stage, countdown
            $gamehash = md5($this->gameResult + time());
            RouletteController::setGameHash($gamehash);

            $this->info('Starting 15 second countdown');
            $this->startTime = time();
            $this->currentStage = 'countdown';
            RouletteService::dispatch([
                'countDown_msec' => $this->_COUNTDOWN_MSEC,
                'currentStage' => $this->currentStage,
            ]);
            // Store game result and start time in cache
            Cache::put('roulette_start_time', $this->startTime);
            Cache::put('current_game_stage', $this->currentStage);

            sleep($this->_COUNTDOWN_MSEC / 1000);
            // next stage, spin
            $this->currentStage = 'spin';

            $this->info('Starting spin');

            $this->gameResult = $this->weightedRandomRoulette();
            $color = match ($this->gameResult) {
                0 => 'green',
                1, 2, 3, 4, 5, 6, 7 => 'red',
                8, 9, 10, 11, 12, 13, 14 => 'black',
                default => null, // fallback for invalid result
            };
            Cache::put('time_at_spin', time());

            Cache::put('roulette_game_result', $this->gameResult);
            Cache::put('current_game_stage', $this->currentStage);

            RouletteService::dispatch([
                'number' => $this->gameResult,
                'currentStage' => $this->currentStage,
            ]);
            sleep(6);
            // last stage, result



            RouletteController::announceResults($color);
            RoulletteHistory::create([
                'number' => $this->gameResult,
                'color' => $color,
                'hash' => $gamehash,
            ]);
            $this->currentStage = 'result';
            Cache::put('current_game_stage', $this->currentStage);

            RouletteService::dispatch([
                'gameResult' => $this->gameResult,
                'currentStage' => $this->currentStage,
                'hash' => $gamehash,
                'color' => $color,

            ]);
            sleep(6);
        }
    }
}
