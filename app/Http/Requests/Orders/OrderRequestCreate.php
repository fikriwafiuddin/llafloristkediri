<?php

namespace App\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequestCreate extends FormRequest
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
            'shipping_method' => 'required|in:delivery,pickup',
            'schedule' => 'required|date',
            'notes' => 'string|nullable',
            'items' => 'required|array|min:1',
            'items.*.product' => 'nullable|array',
            'items.*.product.id' => 'nullable|integer|exists:products,id',
            'items.*.is_custom' => 'required|boolean',
            'items.*.custom_name' => 'nullable|string|max:100',
            'items.*.custom_description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|integer|min:0',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            foreach ($this->items as $index => $item) {

                if ($item['is_custom']) {

                    if (!is_null($item['product'])) {
                        $validator->errors()->add(
                            "items.$index.product",
                            "Product harus null jika item adalah custom."
                        );
                    }

                    if (!$item['custom_name']) {
                        $validator->errors()->add(
                            "items.$index.custom_name",
                            "Nama custom wajib diisi."
                        );
                    }

                    if (!$item['custom_description']) {
                        $validator->errors()->add(
                            "items.$index.custom_description",
                            "Deskripsi custom wajib diisi."
                        );
                    }

                } else {
                    // Case: Item PRODUCT

                    // product.id wajib
                    if (!isset($item['product']['id'])) {
                        $validator->errors()->add(
                            "items.$index.product.id",
                            "ID produk wajib jika item bukan custom."
                        );
                    }

                    // custom fields harus null
                    if (!is_null($item['custom_name']) || !is_null($item['custom_description'])) {
                        $validator->errors()->add(
                            "items.$index.custom_name",
                            "Field custom harus null jika item bukan custom."
                        );
                    }
                }
            }
        });
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
            'shipping_method.required' => 'Metode pengiriman harus dipilih.',
            'shipping_method.in' => 'Metode pengiriman harus berupa delivery atau pickup.',
            'schedule.required' => 'Jadwal harus diisi.',
            'schedule.date' => 'Jadwal harus berupa format tanggal yang valid.',
            'notes.string' => 'Catatan harus berupa string.',
            'items.required' => 'Item pesanan harus diisi.',
            'items.array' => 'Item pesanan harus berupa array.',
            'items.min' => 'Pesanan harus memiliki minimal 1 item.',
            'items.*.product.array' => 'Data produk harus berupa array.',
            'items.*.product.id.integer' => 'ID produk harus berupa angka.',
            'items.*.product.id.exists' => 'ID produk yang dipilih tidak ditemukan.',
            'items.*.is_custom.required' => 'Field is_custom harus diisi.',
            'items.*.is_custom.boolean' => 'Field is_custom harus berupa true atau false.',
            'items.*.custom_name.string' => 'Nama custom harus berupa string.',
            'items.*.custom_name.max' => 'Nama custom tidak boleh lebih dari 100 karakter.',
            'items.*.custom_description.string' => 'Deskripsi custom harus berupa string.',
            'items.*.quantity.required' => 'Jumlah item harus diisi.',
            'items.*.quantity.integer' => 'Jumlah item harus berupa angka.',
            'items.*.quantity.min' => 'Jumlah item minimal 1.',
            'items.*.unit_price.required' => 'Harga satuan harus diisi.',
            'items.*.unit_price.integer' => 'Harga satuan harus berupa angka.',
            'items.*.unit_price.min' => 'Harga satuan minimal 0.',
        ];
    }
}
