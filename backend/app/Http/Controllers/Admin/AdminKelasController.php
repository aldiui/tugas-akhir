<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminKelasController extends Controller
{/**
 * Ambil semua data kelas
 */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Kelas::select(
            'kelas.id as id',
            'kelas.nama as nama',
            'users.nama as pengajar',
            'lokasi.nama as lokasi',
            'kelas.created_at as created_at',
            'kelas.updated_at as updated_at',
        )->join('users', 'kelas.pengajar_id', '=', 'users.id')
            ->join('lokasi', 'kelas.lokasi_id', '=', 'lokasi.id');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kelas.nama', 'REGEXP', $search)
                    ->orWhere('users.nama', 'REGEXP', $search)
                    ->orWhere('lokasi.nama', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'pengajar', 'lokasi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $kelas = $query->paginate($perPage)->withPath('');

        return $this->successResponse($kelas, 'Data kelas berhasil diambil');
    }

    /**
     * Tambah data kelas baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'pengajar_id'                        => 'required|uuid|exists:users,id',
            'lokasi_id'                          => 'required|uuid|exists:lokasi,id',
            'nama'                               => 'required|string|max:50|unique:kelas,nama',
            'mata_pelajaran'                     => 'required|array|min:1',
            'mata_pelajaran.*.mata_pelajaran_id' => 'required|uuid|exists:mata_pelajaran,id',
            'mata_pelajaran.*.hari'              => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'mata_pelajaran.*.jam_masuk'         => 'required|time',
            'mata_pelajaran.*.jam_keluar'        => 'required|time',
        ]);

        DB::beginTransaction();
        try {
            $kelas = Kelas::create([
                'nama'        => $request->input('nama'),
                'pengajar_id' => $request->input('pengajar_id'),
                'lokasi_id'   => $request->input('lokasi_id'),
            ]);

            if (null !== $request->input('mata_pelajaran')) {
                $kelas->jadwalPelajaran()->createMany($request->input('mata_pelajaran'));
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($kelas, 'Data kelas berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail kelas berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $kelas = Kelas::findOrFail($id);
        return $this->successResponse($kelas, 'Detail kelas berhasil diambil');
    }

    /**
     * Perbarui data kelas berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'pengajar_id'                        => 'required|uuid|exists:users,id',
            'lokasi_id'                          => 'required|uuid|exists:lokasi,id',
            'nama'                               => 'required|string|max:50|unique:kelas,nama' . $id,
            'mata_pelajaran'                     => 'required|array|min:1',
            'mata_pelajaran.*.id'                => 'nullable|uuid|exists:jadwal_pelajaran,id',
            'mata_pelajaran.*.mata_pelajaran_id' => 'required|uuid|exists:mata_pelajaran,id',
            'mata_pelajaran.*.hari'              => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'mata_pelajaran.*.jam_masuk'         => 'required|time',
            'mata_pelajaran.*.jam_keluar'        => 'required|time',
        ]);

        $kelas = Kelas::findOrFail($id);

        DB::beginTransaction();
        try {
            $kelas->update([
                'nama'        => $request->input('nama'),
                'pengajar_id' => $request->input('pengajar_id'),
                'lokasi_id'   => $request->input('lokasi_id'),
            ]);

            if (null !== $request->input('mata_pelajaran')) {
                foreach ($request->input('mata_pelajaran') as $mp) {
                    if (isset($mp['id'])) {
                        $jadwal = $kelas->jadwalPelajaran()->find($mp['id']);
                        if ($jadwal) {
                            $jadwal->update($mp);
                        }
                    } else {
                        $kelas->jadwalPelajaran()->create($mp);
                    }
                }
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($kelas, 'Data kelas berhasil diperbarui');
    }

    /**
     * Hapus data kelas berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $kelas = Kelas::findOrFail($id);

        DB::beginTransaction();
        try {
            $kelas->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data kelas berhasil dihapus');
    }
}
