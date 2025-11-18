<?php

namespace App\Http\Requests\categories;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|min:3|max:25|unique:users,name," . $this->route('category'),
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Kolom nama harus diisi.',
            'name.string' => 'Kolom nama harus berupa string.',
            'name.min' => 'Kolom nama harus minimal 3 karakter.',
            'name.max' => 'Kolom nama tidak boleh lebih dari 25 karakter.'
        ];
    }
}
