<?php
namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengalamanKerja extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'pengalaman_kerja';
    protected $guarded = [];

    public function cpmi()
    {
        return $this->belongsTo(User::class, 'id', 'cpmi_id');
    }
}
