<?php
namespace App\Models;

use App\Models\Role;
use App\Models\Kelas;
use App\Models\Piket;
use App\Models\Lokasi;
use App\Models\Negara;
use App\Models\Absensi;
use App\Models\CpmiData;
use App\Models\PengalamanKerja;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasUuids, HasApiTokens;

    protected $fillable = [
        'role_id',
        'lokasi_id',
        'nama',
        'email',
        'nomor_telepon',
        'email_verified_at',
        'password',
        'alamat',
        'foto',
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
    public function cpmiData()
    {
        return $this->hasOne(CpmiData::class, 'cpmi_id', 'id');
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
