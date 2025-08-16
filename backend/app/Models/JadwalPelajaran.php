<?php
namespace App\Models;

use App\Models\User;
use App\Models\Kelas;
use App\Models\MataPelajaran;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function pengajar()
    {
        return $this->hasOne(User::class, 'id', 'pengajar_id');
    }
}
