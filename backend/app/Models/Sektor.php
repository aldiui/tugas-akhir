<?php
namespace App\Models;

use App\Models\JenisPekerjaan;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sektor extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table    = 'sektor';
    protected $fillable = [
        'nama',
        'deskripsi',
    ];

    public function jenisPekerjaan()
    {
        return $this->hasMany(JenisPekerjaan::class);
    }
}
