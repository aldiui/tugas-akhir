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
        Schema::create('cpmi_data', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cpmi_id')->nullable();
            $table->uuid('kelas_id')->nullable();
            $table->uuid('negara_id')->nullable();
            $table->uuid('jenis_pekerjaan_id')->nullable();
            $table->string('nik')->nullable();
            $table->string('nomor_pmi')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['Laki-Laki', 'Perempuan'])->nullable();
            $table->enum('pendidikan_terakhir', ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'])->nullable();
            $table->enum('status', ['Pendaftaran', 'Aktif', 'Tidak Aktif', 'Sudah Terbang'])->default('Pendaftaran');
            $table->json('keahlian')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cpmi_data');
    }
};
