<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TypeEntrepreneurship;

class TypeEntrepreneurshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeEntrepreneurship::create(['name' => 'Tecnología']);
        TypeEntrepreneurship::create(['name' => 'Alimentos y Bebidas']);
        TypeEntrepreneurship::create(['name' => 'Moda y Accesorios']);
        TypeEntrepreneurship::create(['name' => 'Educación']);
        TypeEntrepreneurship::create(['name' => 'Salud y Bienestar']);
    }
}