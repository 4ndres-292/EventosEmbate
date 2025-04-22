<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('ubication')->after('date_event');
            $table->unsignedBigInteger('edited_by')->nullable()->after('ubication');
            $table->unsignedBigInteger('deleted_by')->nullable()->after('edited_by');
            $table->softDeletes(); // Esto agrega la columna deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['ubication', 'edited_by', 'deleted_by', 'deleted_at']);
        });
    }
};
