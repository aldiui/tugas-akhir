<?php
namespace App\Models;

use App\Models\User;
use App\Models\Permission;
use App\Models\RolePermission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table    = 'role';
    protected $fillable = [
        'nama',
        'tipe',
    ];
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function rolePermission()
    {
        return $this->hasMany(RolePermission::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission', 'role_id', 'permission_id');
    }
}
