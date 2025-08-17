<?php

namespace Database\Factories;

use App\Models\Negara;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class NegaraFactory extends Factory
{
    protected $model = Negara::class;

    public function definition(): array
    {
        static $counter = 0;
        $counter++;

        $countries = [
            ['nama' => 'Indonesia', 'mata_uang' => 'Rupiah', 'kode_mata_uang' => 'IDR', 'simbol_mata_uang' => 'Rp'],
            ['nama' => 'Malaysia', 'mata_uang' => 'Ringgit Malaysia', 'kode_mata_uang' => 'MYR', 'simbol_mata_uang' => 'RM'],
            ['nama' => 'Singapura', 'mata_uang' => 'Dolar Singapura', 'kode_mata_uang' => 'SGD', 'simbol_mata_uang' => 'S$'],
            ['nama' => 'Thailand', 'mata_uang' => 'Baht Thailand', 'kode_mata_uang' => 'THB', 'simbol_mata_uang' => '฿'],
            ['nama' => 'Filipina', 'mata_uang' => 'Peso Filipina', 'kode_mata_uang' => 'PHP', 'simbol_mata_uang' => '₱'],
            ['nama' => 'Vietnam', 'mata_uang' => 'Dong Vietnam', 'kode_mata_uang' => 'VND', 'simbol_mata_uang' => '₫'],
            ['nama' => 'Amerika Serikat', 'mata_uang' => 'Dolar Amerika', 'kode_mata_uang' => 'USD', 'simbol_mata_uang' => '$'],
            ['nama' => 'Jepang', 'mata_uang' => 'Yen Jepang', 'kode_mata_uang' => 'JPY', 'simbol_mata_uang' => '¥'],
            ['nama' => 'Korea Selatan', 'mata_uang' => 'Won Korea', 'kode_mata_uang' => 'KRW', 'simbol_mata_uang' => '₩'],
            ['nama' => 'China', 'mata_uang' => 'Yuan China', 'kode_mata_uang' => 'CNY', 'simbol_mata_uang' => '¥'],
        ];

        $country = $countries[$counter % count($countries)];

        return [
            'id' => Str::uuid(),
            'kode' => strtoupper($this->faker->unique()->lexify('??')) . sprintf('%02d', $counter),
            'nama' => $country['nama'] . ' Test ' . $counter,
            'mata_uang' => $country['mata_uang'],
            'kode_mata_uang' => $country['kode_mata_uang'],
            'simbol_mata_uang' => $country['simbol_mata_uang'],
        ];
    }

    public function indonesia(): static
    {
        return $this->state(fn (array $attributes) => [
            'kode' => 'ID',
            'nama' => 'Indonesia',
            'mata_uang' => 'Rupiah',
            'kode_mata_uang' => 'IDR',
            'simbol_mata_uang' => 'Rp',
        ]);
    }

    public function malaysia(): static
    {
        return $this->state(fn (array $attributes) => [
            'kode' => 'MY',
            'nama' => 'Malaysia',
            'mata_uang' => 'Ringgit Malaysia',
            'kode_mata_uang' => 'MYR',
            'simbol_mata_uang' => 'RM',
        ]);
    }
}
