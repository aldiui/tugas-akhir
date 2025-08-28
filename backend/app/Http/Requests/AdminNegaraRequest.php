<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminNegaraRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'nama'             => 'required|string|max:255',
            'mata_uang'        => 'required|string|max:100',
            'kode_mata_uang'   => 'required|string|max:3',
            'simbol_mata_uang' => 'required|string|max:5',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:10|unique:negara,kode',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:10|unique:negara,kode,' . $id,
            ]);
        }

        return [];
    }
}
