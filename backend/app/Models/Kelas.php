<?php
namespace App\Models;

use App\Models\JadwalPelajaran;
use App\Models\Lokasi;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kelas extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'kelas';
    protected $guarded = [
        'pengajar_id',
        'lokasi_id',
        'nama',
    ];

    public function lokasi()
    {
        return $this->belongsTo(Lokasi::class);
    }

    public function pengajar()
    {
        return $this->belongsTo(User::class, 'id', 'pengajar_id');
    }

    public function jadwalPelajaran()
    {
        return $this->hasMany(JadwalPelajaran::class);
    }
}
