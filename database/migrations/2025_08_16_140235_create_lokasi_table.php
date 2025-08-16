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
        Schema::create('lokasi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->time('jam_masuk_mulai');
            $table->time('jam_masuk_selesai');
            $table->time('jam_keluar_mulai');
            $table->time('jam_keluar_selesai');
            $table->integer('radius');
            $table->text('alamat')->nullable();
            $table->string('telepon')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lokasi');
    }
};
