<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CpmiPiketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jam_mulai'       => 'required|date_format:H:i',
            'jam_selesai'     => 'required|date_format:H:i|after:jam_mulai',
            'kegiatan'        => 'required|string',
            'foto_kegiatan'   => 'nullable|array',
            'foto_kegiatan.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
