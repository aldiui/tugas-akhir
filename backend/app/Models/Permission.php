<?php
namespace App\Models;

use App\Models\RolePermission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table   = 'permission';
    protected $guarded = [];

    public function rolePermission()
    {
        return $this->hasMany(RolePermission::class);
    }
}
