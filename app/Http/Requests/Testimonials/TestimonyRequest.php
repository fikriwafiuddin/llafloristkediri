<?php

namespace App\Http\Requests\Testimonials;

use Illuminate\Foundation\Http\FormRequest;

class TestimonyRequest extends FormRequest
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
            'customer_name' => 'required|string|min:3|max:25',
            'rating' => 'required|integer|between:1,5',
            'review' => 'required|string|min:5|max:300'
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
            'customer_name.required' => 'Kolom nama pelanggan harus diisi.',
            'customer_name.string' => 'Kolom nama pelanggan harus berupa string.',
            'customer_name.min' => 'Kolom nama pelanggan harus minimal 3 karakter.',
            'customer_name.max' => 'Kolom nama pelanggan tidak boleh lebih dari 25 karakter.',
            'rating.required' => 'Kolom rating harus diisi.',
            'rating.integer' => 'Kolom rating harus berupa bilangan bulat.',
            'rating.between' => 'Kolom rating harus diisi diantara 1 sampai 5.',
            'review.required' => 'Kolom ulasan harus diisi.',
            'review.string' => 'Kolom ulasan harus berupa string.',
            'review.min' => 'Kolom ulasan harus minimal 5 karakter.',
            'review.max' => 'Kolom ulasan tidak boleh lebih dari 300 karakter.'
        ];
    }
}
