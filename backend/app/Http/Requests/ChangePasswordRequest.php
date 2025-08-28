<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'password_lama'       => 'required|string|min:8|max:255',
            'password'            => 'required|string|min:8|max:255',
            'konfirmasi_password' => 'required|string|min:8|max:255|same:password',
        ];
    }
}
