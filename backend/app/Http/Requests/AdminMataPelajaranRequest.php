<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminMataPelajaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:50|unique:mata_pelajaran,kode',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:50|unique:mata_pelajaran,kode,' . $id,
            ]);
        }

        return [];
    }
}
