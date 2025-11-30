import DatePicker from '@/components/date-picker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import useCartStore from '@/hooks/useCartStore';
import { translateStatus } from '@/lib/utils';
import { store, update } from '@/routes/orders';
import { Order } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ClockIcon } from 'lucide-react';
import { FormEvent } from 'react';

type FormOrderProps = {
    order?: Order;
    type?: 'ADD' | 'UPDATE';
};

function FormOrder({ order, type = 'ADD' }: FormOrderProps) {
    const items = useCartStore((state) => state.items);
    const { data, setData, errors, submit, processing, isDirty } = useForm({
        customer_name: order?.customer_name || '',
        whatsapp_number: order?.whatsapp_number || '',
        address: order?.address || '',
        is_paid: order?.is_paid || false,
        status: order?.status || 'process',
        shipping_method: order?.shipping_method || 'pickup',
        schedule: order?.schedule ? new Date(order?.schedule) : new Date(),
        notes: order?.notes || '',
        items: items,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (order) {
            submit(update(order.id));
        } else {
            submit(store());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="customer_name"
                        className={
                            errors.customer_name ? 'text-destructive' : ''
                        }
                    >
                        Nama Pemesan
                    </Label>
                    <Input
                        id="customer_name"
                        name="customer_name"
                        value={data.customer_name}
                        onChange={(e) =>
                            setData('customer_name', e.target.value)
                        }
                        className={
                            errors.customer_name
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                        placeholder="Masukkan nama pemesan"
                    />
                    <InputError message={errors.customer_name} />
                </div>
                <div>
                    <Label
                        htmlFor="whatsapp_number"
                        className={
                            errors.whatsapp_number ? 'text-destructive' : ''
                        }
                    >
                        Nomor WhatsApp
                    </Label>
                    <Input
                        id="whatsapp_number"
                        name="whatsapp_number"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={data.whatsapp_number}
                        placeholder="Contoh: 6281234567890"
                        onChange={(e) =>
                            setData(
                                'whatsapp_number',
                                e.target.value.replace(/[^0-9]/g, ''),
                            )
                        }
                        className={
                            errors.whatsapp_number
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    <InputError message={errors.whatsapp_number} />
                </div>
                <div>
                    <Label
                        htmlFor="address"
                        className={errors.address ? 'text-destructive' : ''}
                    >
                        Alamat Pengiriman
                    </Label>
                    <Textarea
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className={
                            errors.address
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                        placeholder="Masukkan alamat pengiriman"
                    />
                    <InputError message={errors.address} />
                </div>

                {type === 'UPDATE' && (
                    <div>
                        <Label htmlFor="status">Status Pesanan</Label>
                        <Select
                            onValueChange={(value) => setData('status', value)}
                            value={data.status}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {['process', 'completed', 'cancelled'].map(
                                        (status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {translateStatus(status)}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Label htmlFor="is_paid">Lunas</Label>
                    <Switch
                        id="is_paid"
                        name="is_paid"
                        checked={data.is_paid}
                        onCheckedChange={(checked) =>
                            setData('is_paid', checked)
                        }
                    />
                </div>

                <div>
                    <Label htmlFor="shipping_method">Metode Pengiriman</Label>
                    <Select
                        onValueChange={(value) =>
                            setData(
                                'shipping_method',
                                value as 'pickup' | 'delivery',
                            )
                        }
                        defaultValue={data.shipping_method}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih metode pengiriman" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="pickup">
                                    Ambil di Toko
                                </SelectItem>
                                <SelectItem value="delivery">
                                    Diantar
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="date">Tanggal</Label>
                        <DatePicker
                            onChange={(date: Date) => setData('schedule', date)}
                            value={data.schedule}
                        />
                    </div>
                    <div className="relative">
                        <Label htmlFor="time">Waktu</Label>
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={
                                data.schedule
                                    ? format(data.schedule, 'HH:mm')
                                    : ''
                            }
                            onChange={(e) =>
                                setData(
                                    'schedule',
                                    new Date(
                                        data.schedule
                                            ? format(
                                                  data.schedule,
                                                  'yyyy-MM-dd',
                                              ) +
                                              'T' +
                                              e.target.value
                                            : format(new Date(), 'yyyy-MM-dd') +
                                              'T' +
                                              e.target.value,
                                    ),
                                )
                            }
                            placeholder="Pilih waktu"
                            className="pr-10"
                        />

                        <ClockIcon className="pointer-events-none absolute right-3 bottom-2.5 size-4 opacity-50" />
                    </div>
                </div>

                <div>
                    <Label
                        htmlFor="notes"
                        className={errors.notes ? 'text-destructive' : ''}
                    >
                        Catatan Tambahan
                    </Label>
                    <Input
                        id="notes"
                        name="notes"
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className={
                            errors.notes
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                        placeholder="Masukkan catatan tambahan"
                    />
                    <InputError message={errors.notes} />
                </div>

                <Button type="submit" disabled={processing || !isDirty}>
                    {processing ? <Spinner /> : 'Simpan Pesanan'}
                </Button>
            </div>
        </form>
    );
}

export default FormOrder;
