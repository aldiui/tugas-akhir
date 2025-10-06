<?php
namespace App\Models;

use App\Models\Sektor;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisPekerjaan extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table    = 'jenis_pekerjaan';
    protected $fillable = [
        'sektor_id',
        'nama',
        'deskripsi',
    ];

    public function sektor()
    {
        return $this->belongsTo(Sektor::class);
    }
}
