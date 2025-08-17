<?php
namespace App\Models;

use App\Models\Kelas;
use App\Models\MataPelajaran;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JadwalPelajaran extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'jadwal_pelajaran';
    protected $guarded = [];

    public function mataPelajaran()
    {
        return $this->hasOne(MataPelajaran::class);
    }

    public function kelas()
    {
        return $this->hasOne(Kelas::class);
    }
}
