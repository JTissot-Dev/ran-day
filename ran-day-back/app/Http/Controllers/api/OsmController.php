<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OsmService;
use Illuminate\Http\JsonResponse;

class OsmController extends Controller
{
    protected $osmService;

    public function __construct(OsmService $osmService)
    {
        $this->osmService = $osmService;
    }   

    public function getProgram(Request $request): JsonResponse
    {   
        $program = $this->osmService->getProgram($request->city, $request->program);
        return response()->json($program);
    }
}
