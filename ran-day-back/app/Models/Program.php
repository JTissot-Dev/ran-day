<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'program_city',
        'program_date',
        'program_type',
        'save',
        'favorite',
        'user_id',
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
