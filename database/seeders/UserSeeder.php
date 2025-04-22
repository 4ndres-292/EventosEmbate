<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\TypeUser;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $typeUsers = DB::table('type_users')->pluck('id', 'name');

        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@umss.bo',
                'password' => Hash::make('password'),
                'phone' => '12345678',
                'gender' => 'Masculino',
                'birthdate' => '1990-01-01',
                'type_participant' => 'Administrador',
                'career' => null,
                'institution' => 'UNIVERSIDAD',
                'type_user_id' => $typeUsers['Administrador'],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Supervisor',
                'email' => 'supervisor@umss.bo',
                'password' => Hash::make('password'),
                'phone' => '87654321',
                'gender' => 'Masculino',
                'birthdate' => '1992-02-02',
                'type_participant' => 'Supervisor',
                'career' => null,
                'institution' => 'INSTITUTO TECNOLÓGICO',
                'type_user_id' => $typeUsers['Supervisor'],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Estudiante',
                'email' => 'estudiante@umss.bo',
                'password' => Hash::make('password'),
                'phone' => '11223344',
                'gender' => 'Masculino',
                'birthdate' => '2000-03-03',
                'type_participant' => 'Universitario',
                'career' => 'Ingeniería de Sistemas',
                'institution' => 'UNIVERSIDAD MAYOR',
                'type_user_id' => $typeUsers['Estudiante'],
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
