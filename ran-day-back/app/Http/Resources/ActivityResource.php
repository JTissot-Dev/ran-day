<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ActivityId' => $this->id,
            'name' => $this->activity_name,
            'type' => $this->activity_type,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
        ];
    }
}
