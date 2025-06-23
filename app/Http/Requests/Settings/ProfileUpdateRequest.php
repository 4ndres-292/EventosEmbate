<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['required', 'string', 'max:15'],  // Ejemplo de validación para el teléfono
            'gender' => ['required', 'string'],  // Validación para género
            'birthdate' => ['required', 'date'],  // Validación para fecha de nacimiento
            'career' => ['nullable', 'string', 'max:255'],  // Validación para carrera
            'institution' => ['required', 'string', 'max:255'],  // Validación para institución
            'type_participant' => ['required', 'string'],  // Validación para tipo de participante
        ];
    }
}