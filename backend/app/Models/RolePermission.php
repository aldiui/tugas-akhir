<?php
namespace App\Models;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RolePermission extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table    = 'role_permission';
    protected $fillable = [
        'role_id',
        'permission_id',
    ];

    public function role()
    {
        return $this->hasOne(Role::class);
    }

    public function permission()
    {
        return $this->hasOne(Permission::class);
    }
}
