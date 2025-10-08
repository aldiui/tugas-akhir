<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Izin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminIzinController extends Controller
{
    /**
     * Ambil semua data izin
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Izin::select(
            'izin.id as id',
            'izin.tanggal_mulai as tanggal_mulai',
            'izin.tanggal_selesai as tanggal_selesai',
            'users.nama as cpmi',
            'izin.keterangan as keterangan',
            'izin.status as status',
            'izin.created_at as created_at',
            'izin.updated_at as updated_at',
        )->join('users', 'izin.user_id', '=', 'users.id');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('izin.tanggal_mulai', 'REGEXP', $search)
                    ->orWhere('izin.tanggal_selesai', 'REGEXP', $search)
                    ->orWhere('users.nama', 'REGEXP', $search)
                    ->orWhere('izin.keterangan', 'REGEXP', $search)
                    ->orWhere('izin.status', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'tanggal_mulai', 'tanggal_selesai', 'cpmi', 'keterangan', 'status', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $izin = $query->paginate($perPage)->withPath('');

        return $this->successResponse($izin, 'Data izin berhasil diambil');
    }

    /**
     * Ambil detail izin berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $izin = Izin::findOrFail($id);
        return $this->successResponse($izin, 'Detail izin berhasil diambil');
    }

    /**
     * Perbarui data izin berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:Diterima,Ditolak',
        ]);

        $izin = Izin::where('id', $id)
            ->where('status', 'Diajukan')
            ->firstOrFail();

        DB::beginTransaction();
        try {
            $izin->update([
                'status'           => $request->input('status'),
                'tanggal_approval' => now(),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($izin, 'Data izin berhasil diperbarui');
    }

    /**
     * Hapus data izin berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $izin = Izin::where('id', $id)
            ->where('status', 'Diajukan')
            ->firstOrFail();

        DB::beginTransaction();
        try {
            $izin->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data izin berhasil dihapus');
    }
}
