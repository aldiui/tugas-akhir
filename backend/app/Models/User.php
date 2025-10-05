<?php
namespace App\Models;

use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Lokasi;
use App\Models\Negara;
use App\Models\PengalamanKerja;
use App\Models\Piket;
use App\Models\Role;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasUuids, HasApiTokens;

    protected $fillable = [
        'role_id',
        'lokasi_id',
        'kelas_id',
        'negara_id',
        'nama',
        'email',
        'nik',
        'nomor_telepon',
        'email_verified_at',
        'password',
        'tanggal_lahir',
        'jenis_kelamin',
        'pendidikan_terakhir',
        'alamat',
        'status',
        'foto',
        'keahlian',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'keahlian'          => 'array',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function lokasi()
    {
        return $this->belongsTo(Lokasi::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function negara()
    {
        return $this->belongsTo(Negara::class);
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class, 'cpmi_id', 'id');
    }

    public function pikets()
    {
        return $this->hasMany(Piket::class, 'cpmi_id', 'id');
    }

    public function pengalamanKerjas()
    {
        return $this->hasMany(PengalamanKerja::class, 'cpmi_id', 'id');
    }
}
