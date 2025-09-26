<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notifikasi extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'notifikasi';
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'cpmi_id' => 'array',
        ];
    }
}
