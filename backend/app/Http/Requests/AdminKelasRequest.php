<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        $baseRules = [
            'pengajar_id' => 'required|uuid|exists:users,id',
            'lokasi_id'   => 'required|uuid|exists:lokasi,id',
        ];

        if ($this->isMethod('post')) {
            return array_merge($baseRules, [
                'nama'                               => 'required|string|max:50|unique:kelas,nama',
                'mata_pelajaran'                     => 'required|array|min:1',
                'mata_pelajaran.*.mata_pelajaran_id' => 'required|uuid|exists:mata_pelajaran,id',
                'mata_pelajaran.*.hari'              => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
                'mata_pelajaran.*.jam_masuk'         => 'required|time',
                'mata_pelajaran.*.jam_keluar'        => 'required|time',
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($baseRules, [
                'nama'                               => 'required|string|max:50|unique:kelas,nama' . $id,
                'mata_pelajaran'                     => 'required|array|min:1',
                'mata_pelajaran.*.id'                => 'nullable|uuid|exists:jadwal_pelajaran,id',
                'mata_pelajaran.*.mata_pelajaran_id' => 'required|uuid|exists:mata_pelajaran,id',
                'mata_pelajaran.*.hari'              => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
                'mata_pelajaran.*.jam_masuk'         => 'required|time',
                'mata_pelajaran.*.jam_keluar'        => 'required|time',
            ]);
        }

        return [];
    }
}
