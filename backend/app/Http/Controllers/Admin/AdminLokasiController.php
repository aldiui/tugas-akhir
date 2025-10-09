<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lokasi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminLokasiController extends Controller
{
    /**
     * Ambil semua data lokasi
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Lokasi::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('latitude', 'REGEXP', $search)
                    ->orWhere('longitude', 'REGEXP', $search)
                    ->orWhere('radius', 'REGEXP', $search)
                    ->orWhere('alamat', 'REGEXP', $search)
                    ->orWhere('telepon', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'latitude', 'longitude', 'radius', 'alamat', 'telepon', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $lokasi = $query->paginate($perPage)->withPath('');

        return $this->successResponse($lokasi, 'Data lokasi berhasil diambil');
    }

    /**
     * Tambah data lokasi baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'kode'               => 'required|string|max:50|unique:lokasi,kode',
            'nama'               => 'required|string|max:255',
            'latitude'           => 'required|numeric|between:-90,90',
            'longitude'          => 'required|numeric|between:-180,180',
            'jam_masuk_mulai'    => 'required|date_format:H:i:s',
            'jam_masuk_selesai'  => 'required|date_format:H:i:s|after:jam_masuk_mulai',
            'jam_keluar_mulai'   => 'required|date_format:H:i:s',
            'jam_keluar_selesai' => 'required|date_format:H:i:s|after:jam_keluar_mulai',
            'radius'             => 'required|numeric|min:1',
            'alamat'             => 'nullable|string',
            'telepon'            => 'required|string|max:20',
        ]);

        DB::beginTransaction();
        try {
            $lokasi = Lokasi::create([
                'kode'               => $request->input('kode'),
                'nama'               => $request->input('nama'),
                'latitude'           => $request->input('latitude'),
                'longitude'          => $request->input('longitude'),
                'jam_masuk_mulai'    => $request->input('jam_masuk_mulai'),
                'jam_masuk_selesai'  => $request->input('jam_masuk_selesai'),
                'jam_keluar_mulai'   => $request->input('jam_keluar_mulai'),
                'jam_keluar_selesai' => $request->input('jam_keluar_selesai'),
                'radius'             => $request->input('radius'),
                'alamat'             => $request->input('alamat'),
                'telepon'            => $request->input('telepon'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($lokasi, 'Data lokasi berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail lokasi berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $lokasi = Lokasi::findOrFail($id);
        return $this->successResponse($lokasi, 'Detail lokasi berhasil diambil');
    }

    /**
     * Perbarui data lokasi berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'kode'               => 'required|string|max:50|unique:lokasi,kode,' . $id,
            'nama'               => 'required|string|max:255',
            'latitude'           => 'required|numeric|between:-90,90',
            'longitude'          => 'required|numeric|between:-180,180',
            'jam_masuk_mulai'    => 'required|date_format:H:i:s',
            'jam_masuk_selesai'  => 'required|date_format:H:i:s|after:jam_masuk_mulai',
            'jam_keluar_mulai'   => 'required|date_format:H:i:s',
            'jam_keluar_selesai' => 'required|date_format:H:i:s|after:jam_keluar_mulai',
            'radius'             => 'required|numeric|min:1',
            'alamat'             => 'nullable|string',
            'telepon'            => 'required|string|max:20',
        ]);

        $lokasi = Lokasi::findOrFail($id);

        DB::beginTransaction();
        try {
            $lokasi->update([
                'kode'               => $request->input('kode'),
                'nama'               => $request->input('nama'),
                'latitude'           => $request->input('latitude'),
                'longitude'          => $request->input('longitude'),
                'jam_masuk_mulai'    => $request->input('jam_masuk_mulai'),
                'jam_masuk_selesai'  => $request->input('jam_masuk_selesai'),
                'jam_keluar_mulai'   => $request->input('jam_keluar_mulai'),
                'jam_keluar_selesai' => $request->input('jam_keluar_selesai'),
                'radius'             => $request->input('radius'),
                'alamat'             => $request->input('alamat'),
                'telepon'            => $request->input('telepon'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($lokasi, 'Data lokasi berhasil diperbarui');
    }

    /**
     * Hapus data lokasi berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $lokasi = Lokasi::findOrFail($id);

        DB::beginTransaction();
        try {
            $lokasi->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data lokasi berhasil dihapus');
    }
}
