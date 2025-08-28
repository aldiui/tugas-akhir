<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminLokasiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'nama'               => 'required|string|max:255',
            'latitude'           => 'required|numeric|between:-90,90',
            'longitude'          => 'required|numeric|between:-180,180',
            'jam_masuk_mulai'    => 'required|date_format:H:i',
            'jam_masuk_selesai'  => 'required|date_format:H:i|after:jam_masuk_mulai',
            'jam_keluar_mulai'   => 'required|date_format:H:i',
            'jam_keluar_selesai' => 'required|date_format:H:i|after:jam_keluar_mulai',
            'radius'             => 'required|integer|min:1',
            'alamat'             => 'nullable|string',
            'telepon'            => 'required|string|max:20',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:50|unique:lokasi,kode',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'kode' => 'required|string|max:50|unique:lokasi,kode,' . $id,
            ]);
        }

        return [];
    }
}
