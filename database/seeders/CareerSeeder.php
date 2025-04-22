<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Career;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Career::create(['name' => 'Ingeniería de Sistemas']);
        Career::create(['name' => 'Ingeniería Industrial']);
        Career::create(['name' => 'Ingeniería Mecánica']);
        Career::create(['name' => 'Ingeniería de Software']);
        Career::create(['name' => 'Administración de Empresas']);
        Career::create(['name' => 'Ingeniería Civil']);
    }
}
