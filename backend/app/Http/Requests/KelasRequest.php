<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'pengajar_id'       => 'required|uuid|exists:users,id',
            'mata_pelajaran_id' => 'required|uuid|exists:mata_pelajaran,id',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'nama' => 'required|string|max:50|unique:kelas,nama',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'nama' => 'required|string|max:50|unique:kelas,nama' . $id,
            ]);
        }

        return [];
    }
}
