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
        Schema::create('absensi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cpmi_id')->nullable();
            $table->date('tanggal')->nullable();
            $table->double('latitude_masuk')->nullable();
            $table->double('longitude_masuk')->nullable();
            $table->double('latitude_keluar')->nullable();
            $table->double('longitude_keluar')->nullable();
            $table->time('jam_masuk')->nullable();
            $table->time('jam_keluar')->nullable();
            $table->string('status_masuk')->nullable();
            $table->string('status_keluar')->nullable();
            $table->text('alasan_masuk')->nullable();
            $table->text('alasan_keluar')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi');
    }
};
