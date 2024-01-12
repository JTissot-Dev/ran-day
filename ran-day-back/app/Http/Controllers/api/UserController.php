<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdateUserRequest;
use Exception;


class UserController extends Controller
{
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $data = $request->validated();
            $user->first_name = $data['firstName']; 
            $user->last_name = $data['lastName']; 
            $user->email = $data['email']; 
            $user->save();
            return new UserResource($user);
            
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
