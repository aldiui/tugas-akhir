<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Models\PengalamanKerja;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CpmiPengalamanKerjaController extends Controller
{
    /**
     * Ambil semua data pengalaman kerja
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $cpmi  = $request->user();
        $query = PengalamanKerja::query();
        $query->where('cpmi_id', $cpmi->id);
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('perusahaan', 'REGEXP', $search)
                    ->orWhere('posisi', 'REGEXP', $search)
                    ->orWhere('tanggal_mulai', 'REGEXP', $search)
                    ->orWhere('tanggal_selesai', 'REGEXP', $search)
                    ->orWhere('deskripsi', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'perusahaan', 'posisi', 'tanggal_mulai', 'tanggal_selesai', 'deskripsi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $pengalamanKerja = $query->paginate($perPage)->withPath('');

        return $this->successResponse($pengalamanKerja, 'Data pengalaman kerja berhasil diambil');
    }

    /**
     * Tambah data pengalaman kerja baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'perusahaan'      => 'required|string|max:255',
            'posisi'          => 'required|string|max:255',
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'deskripsi'       => 'required|string',
        ]);

        $cpmi = $request->user();
        DB::beginTransaction();
        try {
            $pengalamanKerja = PengalamanKerja::create([
                'cpmi_id'         => $cpmi->id,
                'perusahaan'      => $request->perusahaan,
                'posisi'          => $request->posisi,
                'tanggal_mulai'   => $request->tanggal_mulai,
                'tanggal_selesai' => $request->tanggal_selesai,
                'deskripsi'       => $request->deskripsi,
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($pengalamanKerja, 'Data pengalaman kerja berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail pengalaman kerja berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $cpmi            = auth()->user();
        $pengalamanKerja = PengalamanKerja::where('id', $id)
            ->where('cpmi_id', $cpmi->id)
            ->firstOrFail();

        return $this->successResponse($pengalamanKerja, 'Detail pengalaman kerja berhasil diambil');
    }

    /**
     * Perbarui data pengalaman kerja berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'perusahaan'      => 'required|string|max:255',
            'posisi'          => 'required|string|max:255',
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'deskripsi'       => 'required|string',
        ]);

        $cpmi            = auth()->user();
        $pengalamanKerja = PengalamanKerja::where('id', $id)
            ->where('cpmi_id', $cpmi->id)
            ->firstOrFail();

        DB::beginTransaction();
        try {
            $pengalamanKerja->update([
                'perusahaan'      => $request->perusahaan,
                'posisi'          => $request->posisi,
                'tanggal_mulai'   => $request->tanggal_mulai,
                'tanggal_selesai' => $request->tanggal_selesai,
                'deskripsi'       => $request->deskripsi,
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($pengalamanKerja, 'Data pengalaman kerja berhasil diperbarui');
    }

    /**
     * Hapus data pengalaman kerja berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $cpmi            = auth()->user();
        $pengalamanKerja = PengalamanKerja::where('id', $id)
            ->where('cpmi_id', $cpmi->id)
            ->firstOrFail();

        DB::beginTransaction();
        try {
            $pengalamanKerja->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data pengalaman kerja berhasil dihapus');
    }
}
