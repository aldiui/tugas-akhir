<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'nama'    => 'required|string|max:255',
            'role_id' => 'required|uuid|exists:role,id',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'email'               => 'required|string|email|max:255|unique:users,email',
                'password'            => 'required|string|min:8|max:255',
                'konfirmasi_password' => 'required|string|min:8|max:255|same:password',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'email'               => 'required|string|email|max:255|unique:users,email,' . $id,
                'password'            => 'nullable|string|min:8|max:255',
                'konfirmasi_password' => 'nullable|string|min:8|max:255|same:password',
            ]);
        }

        return [];
    }
}
