<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'programId' => $this->id,
            'city' => $this->program_city,
            'date' => $this->program_date,
            'theme' => $this->program_type,
            'save' => $this->save,
            'favorite' => $this->favorite,
            'activities' => ActivityResource::collection($this->activities)
        ];
    }
}
