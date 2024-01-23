<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $seedDate = Carbon::now();

        for ($i =1; $i < 20-1; $i++) {
            $programId = DB::table('programs')->insertGetId([
                'program_city' => Str::random(10),
                'program_date' => $seedDate,
                'program_type' => 'classic_program',
                'favorite' => true,
                'save' => true,
                'user_id' => 1
            ]);
        
            for ($y=1; $y < 4-1; $y++) {
                $listId = DB::table('activities')->insertGetId([
                    'activity_name' => Str::random(10),
                    'activity_type' => 'attraction',
                    'latitude' => 48.856614,
                    'longitude' => 2.3522219,
                    'program_id' => $programId
                ]);
            }
        }
    }
}
