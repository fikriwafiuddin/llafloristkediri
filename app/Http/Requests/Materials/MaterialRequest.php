<?php

namespace App\Http\Requests\Materials;

use Illuminate\Foundation\Http\FormRequest;

class MaterialRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:25',
            'price' => 'required|numeric|min:1',
            'stock' => 'required|integer|min:0'
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
            'name.max' => 'Kolom nama tidak boleh lebih dari 25 karakter.',
            'price.required' => 'Kolom harga harus diisi.',
            'price.numeric' => 'Kolom harga harus berupa angka.',
            'price.min' => 'Kolom harga harus berupa angka positif.',
            'stock.required' => 'Kolom stok harus diisi.',
            'stock.integer' => 'Kolom stok harus berupa bilangan bulat.',
            'stock.min' => 'Kolom stok tidak boleh kurang dari 0.'
        ];
    }
}
