<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Institution;

class InstitutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Institution::create(['name' => 'Universidad Nacional']);
        Institution::create(['name' => 'Instituto Técnico']);
        Institution::create(['name' => 'Escuela Superior']);
    }
}
