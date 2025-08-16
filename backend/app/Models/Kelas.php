<?php
namespace App\Models;

use App\Models\Lokasi;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kelas extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'kelas';
    protected $guarded = [];

    public function lokasi()
    {
        return $this->hasOne(Lokasi::class);
    }
}
