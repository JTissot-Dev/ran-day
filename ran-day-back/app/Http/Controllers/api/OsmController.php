<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OsmService;
use Illuminate\Http\JsonResponse;
use Exception;


class OsmController extends Controller
{
    protected $osmService;

    public function __construct(OsmService $osmService)
    {
        $this->osmService = $osmService;
    }   

    public function getProgram(Request $request): JsonResponse
    {   
        try {
            $program = $this->osmService->getProgram($request->city, $request->program);
            return response()->json($program);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Erreur lors de la récupération du programme'
            ], 500);
        }
    }
}
