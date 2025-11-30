<?php

namespace App\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequestUpdate extends FormRequest
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
            'customer_name' => 'required|string|min:3|max:55',
            'whatsapp_number' => 'required|numeric|digits_between:10,15',
            'address' => 'required|string',
            'is_paid' => 'required|boolean',
            'status' => 'required|in:process,completed,canceled',
            'shipping_method' => 'required|in:delivery,pickup',
            'schedule' => 'required|date',
            'notes' => 'string|nullable',
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
            'customer_name.max' => 'Kolom nama pelanggan tidak boleh lebih dari 55 karakter.',
            'whatsapp_number.required' => 'Nomor WhatsApp harus diisi.',
            'whatsapp_number.numeric' => 'Nomor WhatsApp harus berupa angka.',
            'whatsapp_number.digits_between' => 'Nomor WhatsApp harus memiliki panjang 10 hingga 15 digit.',
            'address.required' => 'Alamat harus diisi.',
            'address.string' => 'Alamat harus berupa string.',
            'is_paid.required' => 'Status pembayaran harus diisi.',
            'is_paid.boolean' => 'Status pembayaran harus berupa true atau false.',
            'status.required' => 'Status pesanan harus diisi.',
            'status.in' => 'Status harus berupa completed, process, atau canceled',
            'shipping_method.required' => 'Metode pengiriman harus dipilih.',
            'shipping_method.in' => 'Metode pengiriman harus berupa delivery atau pickup.',
            'schedule.required' => 'Jadwal harus diisi.',
            'schedule.date' => 'Jadwal harus berupa format tanggal yang valid.',
            'notes.string' => 'Catatan harus berupa string.',
        ];
    }
}
