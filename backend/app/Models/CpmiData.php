<?php
namespace App\Models;

use App\Models\Kelas;
use App\Models\Negara;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CpmiData extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table    = 'cpmi_data';
    protected $fillable = [
        'cpmi_id',
        'kelas_id',
        'negara_id',
        'jenis_pekerjaan_id',
        'nik',
        'nomor_pmi',
        'tanggal_lahir',
        'jenis_kelamin',
        'pendidikan_terakhir',
        'status',
        'keahlian',
    ];

    protected $casts = [
        'keahlian' => 'array',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function negara()
    {
        return $this->belongsTo(Negara::class);
    }
}
