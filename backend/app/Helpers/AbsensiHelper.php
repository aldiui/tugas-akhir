<?php
namespace App\Helpers;


class AbsensiHelper
{
    public static function calculateDistance($latPresesensi, $lonPresesensi, $latSetting, $lonSetting)
    {
        if (! is_numeric($latPresesensi) || ! is_numeric($lonPresesensi) || ! is_numeric($latSetting) || ! is_numeric($lonSetting)) {
            throw new \InvalidArgumentException('Input tidak valid. Latitude dan longitude harus berupa angka.');
        }

        if ($latPresesensi < -90 || $latPresesensi > 90 ||
            $latSetting < -90 || $latSetting > 90 ||
            $lonPresesensi < -180 || $lonPresesensi > 180 ||
            $lonSetting < -180 || $lonSetting > 180) {
            throw new \InvalidArgumentException('Input tidak valid. Latitude harus antara -90 dan 90, dan longitude harus antara -180 dan 180.');
        }

        $latPresesensiRad = deg2rad($latPresesensi);
        $lonPresesensiRad = deg2rad($lonPresesensi);
        $latSettingRad    = deg2rad($latSetting);
        $lonSettingRad    = deg2rad($lonSetting);

        $deltaLat = $latSettingRad - $latPresesensiRad;
        $deltaLon = $lonSettingRad - $lonPresesensiRad;

        $a = sin($deltaLat / 2) * sin($deltaLat / 2) +
        cos($latPresesensiRad) * cos($latSettingRad) *
        sin($deltaLon / 2) * sin($deltaLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $distance = 6371 * $c;

        return $distance * 1000;
    }

    public static function calculateSelisihJarak($selisih)
    {
        return ($selisih < 1000)
        ? $selisih . ' meter'
        : round($selisih / 1000, 2) . ' km';
    }
}
