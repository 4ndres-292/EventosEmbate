<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ParticipantType;

class ParticipantTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ParticipantType::create(['name' => 'Estudiante']);
        ParticipantType::create(['name' => 'Universitario']);
        ParticipantType::create(['name' => 'Docente']);
        ParticipantType::create(['name' => 'Administrativo']);
        ParticipantType::create(['name' => 'Emprendedor']);
        ParticipantType::create(['name' => 'Empresario']);
    }
}