<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->default('')->after('password');
            $table->string('gender')->default('Masculino')->after('phone');
            $table->date('birthdate')->default(now())->after('gender');
            $table->string('type_participant')->default('')->after('birthdate');
            $table->string('career')->nullable()->after('type_participant');
            $table->string('institution')->default('')->after('career');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'gender', 'birthdate', 'type_participant', 'career', 'institution']);
        });
    }
};