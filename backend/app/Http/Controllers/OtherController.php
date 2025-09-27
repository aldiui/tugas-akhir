<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Lokasi;
use App\Models\Negara;

class OtherController extends Controller
{
    /**
     * Ambil semua data lokasi
     */
    public function getLokasi()
    {
        $lokasi = Lokasi::select('id', 'nama')->get();
        return $this->successResponse($lokasi, 'Data lokasi berhasil diambil');
    }

    /**
     * Ambil semua data negara
     */
    public function getNegara()
    {
        $negara = Negara::select('id', 'nama')->get();
        return $this->successResponse($negara, 'Data negara berhasil diambil');
    }
}
