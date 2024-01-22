<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use Exception;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramRequest $request)
    {
        try {
            $data = $request->validated();
            $program = Program::create([
                'program_city' => $data['city'],
                'program_type' => $data['theme'],
                'program_date' => $data['date'],
                'save' => $data['save'],
                'favorite' => $data['favorite'],
                'user_id' => auth()->user()->id,
            ]);
    
            foreach ($data['activities'] as $activity) {
                $program->activities()->create([
                    'activity_name' => $activity['name'],
                    'activity_type' => $activity['type'],
                    'latitude' => $activity['latitude'],
                    'longitude' => $activity['longitude'],
                ]);
            }
            return new ProgramResource($program);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Erreur lors de la création du programme'], 
                500
            );
        }
    }

    public function update(UpdateProgramRequest $request, Program $program)
    {
        try {
            $data = $request->validated();
            $program->update([
                'save' => $data['save'],
                'favorite' => $data['favorite'],
            ]);
            return new ProgramResource($program);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du programme'], 
                500
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Program $program)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        try {
            $program->delete();
            return response()->json([
                'message' => 'Programme supprimé avec succès'
            ], 204);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Erreur lors de la suppression du programme'], 
                500
            );
        }
    }
}
