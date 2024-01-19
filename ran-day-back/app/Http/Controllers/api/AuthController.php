<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        try {
            $data = $request->validated();
            $user = User::create([
                'first_name' => $data['firstName'],
                'last_name' => $data['lastName'],
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);
    
            $token = $user->createToken('token')->plainTextToken;
            
            return response()->json([
                'userId' => $user->id,
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'email' => $user->email,
                'token' => $token
            ], 201);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du compte'
            ], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $crendentials = $request->validated();
        
            if (!Auth::attempt($crendentials)) {
                return response()->json([
                    'message' => 'Email ou mot de passe invalide'
                ], 422);
            }
        
            /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
        
            return response()->json([
                'userId' => $user->id,
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'email' => $user->email,
                'token' => $token
            ], 200);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Une erreur est survenue lors de la connexion'
            ], 500);
        }
    }

    public function logout (Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Succès de la déconnexion'], 204);
        } catch (Exception $e) {
            info($e);
            return response()->json([
                'message' => 'Une erreur est survenue lors de la déconnexion'
            ], 500);
        }
    }
}
