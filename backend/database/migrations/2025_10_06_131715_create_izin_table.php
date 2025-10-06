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
        Schema::create('izin', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cpmi_id');
            $table->uuid('approval_id')->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->longText('keterangan');
            $table->enum('status', ['Diajukan', 'Diterima', 'Ditolak'])->default('Diajukan');
            $table->json('dokumen')->nullable();
            $table->dateTime('tanggal_approval')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('izin');
    }
};
