<?php

namespace App\Http\Requests\CashTransactions;

use Illuminate\Foundation\Http\FormRequest;

class CashTransactionRequest extends FormRequest
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
            'type' => 'required|in:income,expense',
            'category' => 'required|string|min:3|max:25',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'description' => 'string|nullable'
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
            'type.required' => 'Jenis transaksi harus diisi.',
            'type.in' => 'Jenis transaksi harus berupa income atau expense.',
            'category.required' => 'Kategori harus diisi.',
            'category.string' => 'Kategori harus berupa string.',
            'category.min' => 'Kategori harus minimal 3 karakter.',
            'category.max' => 'Kategori tidak boleh lebih dari 25 karakter.',
            'amount.required' => 'Jumlah transaksi harus diisi.',
            'amount.numeric' => 'Jumlah transaksi harus berupa angka.',
            'amount.min' => 'Jumlah transaksi minimal 0.',
            'transaction_date.required' => 'Tanggal transaksi harus diisi.',
            'transaction_date.date' => 'Tanggal transaksi harus berupa format tanggal yang valid.',
            'description.string' => 'Deskripsi harus berupa string.',
        ];
    }
}
