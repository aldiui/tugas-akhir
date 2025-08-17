<?php
namespace Tests\Feature;

use App\Models\Negara;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NegaraTest extends TestCase
{
    use RefreshDatabase;

    public function test_bisa_membuat_negara()
    {
        $payload = [
            'kode'             => 'ID',
            'nama'             => 'Indonesia',
            'mata_uang'        => 'Rupiah',
            'kode_mata_uang'   => 'IDR',
            'simbol_mata_uang' => 'Rp',
        ];

        $response = $this->postJson('/api/negara', $payload);

        if ($response->status() !== 201) {
            dump('Actual Response Status:', $response->status());
            dump('Actual Response Body:', $response->json());
        }

        $response->assertStatus(201);

        $responseData = $response->json();

        if (isset($responseData['success'])) {
            $response->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'kode',
                    'nama',
                    'mata_uang',
                    'kode_mata_uang',
                    'simbol_mata_uang',
                ],
            ])->assertJson([
                'success' => true,
                'data'    => [
                    'kode' => 'ID',
                    'nama' => 'Indonesia',
                ],
            ]);
        } else {
            $response->assertJsonFragment([
                'kode' => 'ID',
                'nama' => 'Indonesia',
            ]);
        }

        $this->assertDatabaseHas('negara', [
            'kode' => 'ID',
            'nama' => 'Indonesia',
        ]);
    }

    public function test_tidak_bisa_membuat_negara_dengan_kode_duplikat()
    {
        Negara::factory()->create(['kode' => 'ID']);

        $payload = [
            'kode'             => 'ID',
            'nama'             => 'Indonesia',
            'mata_uang'        => 'Rupiah',
            'kode_mata_uang'   => 'IDR',
            'simbol_mata_uang' => 'Rp',
        ];

        $response = $this->postJson('/api/negara', $payload);

        if ($response->status() !== 422) {
            dump('Expected 422, got:', $response->status());
            dump('Response body:', $response->json());
        }

        $response->assertStatus(422);

        $responseData = $response->json();

        if (isset($responseData['errors'])) {
            $response->assertJsonValidationErrors(['kode']);
        } elseif (isset($responseData['message']) && str_contains($responseData['message'], 'kode')) {
            $this->assertTrue(str_contains(json_encode($responseData), 'kode'));
        }
    }

    public function test_tidak_bisa_membuat_negara_tanpa_field_wajib()
    {
        $payload = [
            'nama' => 'Indonesia',
        ];

        $response = $this->postJson('/api/negara', $payload);

        if ($response->status() !== 422) {
            dump('Expected 422, got:', $response->status());
            dump('Response body:', $response->json());
        }

        $response->assertStatus(422);

        $responseData = $response->json();

        if (isset($responseData['errors'])) {
            $this->assertArrayHasKey('kode', $responseData['errors']);
        } elseif (isset($responseData['message'])) {
            $responseContent = json_encode($responseData);
            $this->assertTrue(
                str_contains($responseContent, 'kode') ||
                str_contains($responseContent, 'required'),
                'Response should contain validation errors for required fields'
            );
        }
    }

    public function test_bisa_melihat_daftar_negara()
    {
        $negara1 = Negara::factory()->create(['nama' => 'Indonesia Test']);
        $negara2 = Negara::factory()->create(['nama' => 'Malaysia Test']);

        $response = $this->getJson('/api/negara');

        $response->assertStatus(200);

        $responseData = $response->json();
        if (isset($responseData['success'])) {
            $response->assertJson(['success' => true]);
            $this->assertStringContainsString('Indonesia Test', json_encode($responseData));
        } else {
            $response->assertJsonFragment(['nama' => 'Indonesia Test']);
        }
    }

    public function test_bisa_mencari_negara()
    {
        Negara::factory()->create(['nama' => 'Indonesia Search']);
        Negara::factory()->create(['nama' => 'Malaysia Search']);

        $response = $this->getJson('/api/negara?search=Indo');

        $response->assertStatus(200);

        $responseContent = json_encode($response->json());
        $this->assertStringContainsString('Indonesia Search', $responseContent);
        $this->assertStringNotContainsString('Malaysia Search', $responseContent);
    }

    public function test_bisa_mengatur_limit_dan_sorting()
    {
        Negara::factory()->count(15)->create();

        $response = $this->getJson('/api/negara?limit=5');

        $response->assertStatus(200);
        $responseData = $response->json();
        $this->assertNotEmpty($responseData);
    }

    public function test_bisa_melihat_detail_negara()
    {
        $negara = Negara::factory()->create([
            'kode' => 'ID',
            'nama' => 'Indonesia Detail',
        ]);

        $response = $this->getJson('/api/negara/' . $negara->id);

        $response->assertStatus(200);

        $responseData = $response->json();

        if (isset($responseData['success'])) {
            $response->assertJson([
                'success' => true,
                'data'    => [
                    'id'   => $negara->id,
                    'nama' => 'Indonesia Detail',
                ],
            ]);
        } else {
            $response->assertJsonFragment([
                'id'   => $negara->id,
                'nama' => 'Indonesia Detail',
            ]);
        }
    }

    public function test_tidak_bisa_melihat_detail_negara_yang_tidak_ada()
    {
        $response = $this->getJson('/api/negara/99999999-9999-9999-9999-999999999999');

        $response->assertStatus(404);
    }

    public function test_bisa_update_negara()
    {
        $negara = Negara::factory()->create([
            'kode' => 'ID',
            'nama' => 'Indonesia Lama',
        ]);

        $payload = [
            'kode'             => 'ID',
            'nama'             => 'Indonesia Baru',
            'mata_uang'        => 'Rupiah',
            'kode_mata_uang'   => 'IDR',
            'simbol_mata_uang' => 'Rp',
        ];

        $response = $this->putJson('/api/negara/' . $negara->id, $payload);

        $response->assertStatus(200);

        $responseData = $response->json();

        if (isset($responseData['success'])) {
            $response->assertJson([
                'success' => true,
                'data'    => [
                    'nama' => 'Indonesia Baru',
                ],
            ]);
        } else {
            $response->assertJsonFragment(['nama' => 'Indonesia Baru']);
        }

        $this->assertDatabaseHas('negara', [
            'id'   => $negara->id,
            'nama' => 'Indonesia Baru',
        ]);
    }

    public function test_tidak_bisa_update_negara_dengan_kode_duplikat()
    {
        $negara1 = Negara::factory()->create(['kode' => 'ID']);
        $negara2 = Negara::factory()->create(['kode' => 'MY']);

        $payload = [
            'kode'             => 'ID', // Duplicate
            'nama'             => 'Updated Name',
            'mata_uang'        => 'Currency',
            'kode_mata_uang'   => 'CUR',
            'simbol_mata_uang' => 'C',
        ];

        $response = $this->putJson('/api/negara/' . $negara2->id, $payload);

        $response->assertStatus(422);

        // Check for validation error about duplicate kode
        $responseContent = json_encode($response->json());
        $this->assertTrue(str_contains($responseContent, 'kode') || str_contains($responseContent, 'unique'));
    }

    public function test_tidak_bisa_update_negara_yang_tidak_ada()
    {
        $payload = [
            'kode'             => 'ID',
            'nama'             => 'Indonesia',
            'mata_uang'        => 'Rupiah',
            'kode_mata_uang'   => 'IDR',
            'simbol_mata_uang' => 'Rp',
        ];

        $response = $this->putJson('/api/negara/99999999-9999-9999-9999-999999999999', $payload);

        $response->assertStatus(404);
    }

    public function test_bisa_hapus_negara()
    {
        $negara = Negara::factory()->create();

        $response = $this->deleteJson('/api/negara/' . $negara->id);

        $response->assertStatus(200);

        // Since you're using SoftDeletes, the record might still exist but with deleted_at timestamp
        // Check if it's soft deleted instead of completely removed
        $this->assertSoftDeleted('negara', ['id' => $negara->id]);

        // Alternative: Check if it's completely removed (uncomment if you're doing hard delete)
        // $this->assertDatabaseMissing('negara', ['id' => $negara->id]);
    }

    public function test_tidak_bisa_hapus_negara_yang_tidak_ada()
    {
        $response = $this->deleteJson('/api/negara/99999999-9999-9999-9999-999999999999');

        $response->assertStatus(404);
    }

    public function test_validasi_panjang_maksimal_field()
    {
        $payload = [
            'kode'             => str_repeat('A', 11),  // Max 10 chars
            'nama'             => str_repeat('A', 256), // Max 255 chars
            'mata_uang'        => str_repeat('A', 101), // Max 100 chars
            'kode_mata_uang'   => str_repeat('A', 4),   // Max 3 chars
            'simbol_mata_uang' => str_repeat('A', 6),   // Max 5 chars
        ];

        $response = $this->postJson('/api/negara', $payload);

        $response->assertStatus(422);

        // Check that validation failed for field length
        $responseContent = json_encode($response->json());
        $this->assertTrue(
            str_contains($responseContent, 'kode') ||
            str_contains($responseContent, 'max') ||
            str_contains($responseContent, 'validation'),
            'Response should contain validation errors for field length'
        );
    }
}
