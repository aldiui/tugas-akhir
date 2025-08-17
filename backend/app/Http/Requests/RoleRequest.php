<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'tipe'          => 'required|string|in:CPMI,Admin',
            'permissions'   => 'required|array|min:1',
            'permissions.*' => 'required|string|exists:permission,id',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'nama' => 'required|string|max:255|unique:role,nama',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'nama' => 'required|string|max:255|unique:role,kode,' . $id,
            ]);
        }

        return [];
    }
}
