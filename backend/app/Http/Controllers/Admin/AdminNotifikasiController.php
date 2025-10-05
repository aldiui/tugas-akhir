<?php
namespace App\Http\Controllers\Admin;

use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminNotifikasiController extends Controller
{
    /**
     * Ambil semua data notifikasi
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Notifikasi::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'judul', 'deskripsi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $notifikasi = $query->paginate($perPage)->withPath('');

        return $this->successResponse($notifikasi, 'Data notifikasi berhasil diambil');
    }

    /**
     * Tambah data notifikasi baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul'     => 'required|string|max:255|unique:notifikasi,judul',
            'deskripsi' => 'required|string',
            'status'    => 'required|in:urgent,biasa',
            'target'    => 'required|in:semua,spesifik',
            'cpmi_id'   => 'required_if:target,spesifik|array',
            'cpmi_id.*' => 'exists:cpmi,id',
        ]);

        DB::beginTransaction();
        try {
            $notifikasi = Notifikasi::create([
                'judul'     => $request->input('judul'),
                'deskripsi' => $request->input('deskripsi'),
                'status'    => $request->input('status'),
                'target'    => $request->input('target'),
                'cpmi_id'   => $request->input('cpmi_id', []),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($notifikasi, 'Data notifikasi berhasil ditambahkan');
    }

    /**
     * Ambil detail notifikasi berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $notifikasi = Notifikasi::findOrFail($id);
        return $this->successResponse($notifikasi, 'Detail notifikasi berhasil diambil');
    }

    /**
     * Perbarui data notifikasi berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'judul'     => 'required|string|max:255|unique:notifikasi,judul,' . $id,
            'deskripsi' => 'required|string',
        ]);

        $notifikasi = Notifikasi::findOrFail($id);

        DB::beginTransaction();
        try {
            $notifikasi->update([
                'judul'     => $request->input('judul'),
                'deskripsi' => $request->input('deskripsi'),
                'status'    => $request->input('status'),
                'target'    => $request->input('target'),
                'cpmi_id'   => $request->input('cpmi_id', []),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($kelas, 'Data kelas berhasil diperbarui');
    }

    /**
     * Hapus data notifikasi berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $notifikasi = Notifikasi::findOrFail($id);

        DB::beginTransaction();
        try {
            $notifikasi->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data notifikasi berhasil dihapus');
    }
}
