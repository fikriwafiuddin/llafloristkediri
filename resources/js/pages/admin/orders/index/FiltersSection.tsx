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
import useDebounce from '@/hooks/useDebounce';
import { translateStatus } from '@/lib/utils';
import { index } from '@/routes/orders';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

type FiltersSectionProps = {
    filters: {
        customer_name: string;
        whatsapp: string;
        year: string;
        month: string;
        status: string;
        payment: string;
        shipping_method: string;
    };
};

function FiltersSection({ filters }: FiltersSectionProps) {
    const initialCustomerName = filters.customer_name || '';
    const initialWhatsapp = filters.whatsapp || '';
    const initialYear = filters.year || new Date().getFullYear().toString();
    const initialMonth = filters.month || new Date().getMonth().toString();
    const initialStatus = filters.status || 'all';
    const initialPayment = filters.payment || 'all';
    const initialShippingMethod = filters.shipping_method || 'all';

    const [customerName, setCustomerName] = useState(initialCustomerName);
    const [whatsapp, setWhatsapp] = useState(initialWhatsapp);
    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const [status, setStatus] = useState(initialStatus);
    const [payment, setPayment] = useState(initialPayment);
    const [shippingMethod, setShippingMethod] = useState(initialShippingMethod);

    const debouncedCustomerName = useDebounce(customerName, 500);
    const debouncedWhatsapp = useDebounce(whatsapp, 500);
    const debouncedYear = useDebounce(year, 500);
    const debouncedMonth = useDebounce(month, 500);
    const debouncedStatus = useDebounce(status, 500);
    const debouncedPayment = useDebounce(payment, 500);
    const debouncedShippingMethod = useDebounce(shippingMethod, 500);
    const isInitialMount = useRef(true);

    const prevCustomerName = useRef(initialCustomerName);
    const prevWhatsapp = useRef(initialWhatsapp);
    const prevYear = useRef(initialYear);
    const prevMonth = useRef(initialMonth);
    const prevStatus = useRef(initialStatus);
    const prevPayment = useRef(initialPayment);
    const prevShippingMethod = useRef(initialShippingMethod);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const customerNameChanged =
            debouncedCustomerName !== prevCustomerName.current;
        const whatsappChanged = debouncedWhatsapp !== prevWhatsapp.current;
        const yearChanged = debouncedYear !== prevYear.current;
        const monthChanged = debouncedMonth !== prevMonth.current;
        const statusChanged = debouncedStatus !== prevStatus.current;
        const paymentChanged = debouncedPayment !== prevPayment.current;
        const shippingMethodChanged =
            debouncedShippingMethod !== prevShippingMethod.current;

        if (
            customerNameChanged ||
            whatsappChanged ||
            yearChanged ||
            monthChanged ||
            statusChanged ||
            paymentChanged ||
            shippingMethodChanged
        ) {
            prevCustomerName.current = String(debouncedCustomerName);
            prevWhatsapp.current = String(debouncedWhatsapp);
            prevYear.current = String(debouncedYear);
            prevMonth.current = String(debouncedMonth);
            prevStatus.current = String(debouncedStatus);
            prevPayment.current = String(debouncedPayment);
            prevShippingMethod.current = String(debouncedShippingMethod);

            router.get(
                index().url,
                {
                    customer_name: debouncedCustomerName,
                    whatsapp: debouncedWhatsapp,
                    year: debouncedYear,
                    month: debouncedMonth,
                    status: debouncedStatus,
                    payment: debouncedPayment,
                    shipping_method: debouncedShippingMethod,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [
        debouncedCustomerName,
        debouncedWhatsapp,
        debouncedYear,
        debouncedMonth,
        debouncedStatus,
        debouncedPayment,
        debouncedShippingMethod,
    ]);

    return (
        <div className="space-y-2">
            <div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Input
                        id="customer_name"
                        name="customer_name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Cari berdasarkan nama pelanggan"
                    />
                    <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Cari berdasarkan no. whatsapp"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <Label htmlFor="year">Tahun:</Label>
                    <Select value={year} onValueChange={setYear}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {[
                                    ...Array(
                                        new Date().getFullYear() - 2020 + 1,
                                    ),
                                ].map((_, i) => {
                                    const yearStr = (2020 + i).toString();
                                    return (
                                        <SelectItem
                                            key={yearStr}
                                            value={yearStr}
                                        >
                                            {yearStr}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="month">Bulan:</Label>
                    <Select value={month} onValueChange={setMonth}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih bulan" />
                        </SelectTrigger>
                        <SelectContent className="max-h-40 overflow-y-auto">
                            <SelectGroup>
                                {months.map((monthName, index) => {
                                    return (
                                        <SelectItem
                                            key={monthName}
                                            value={index.toString()}
                                        >
                                            {monthName}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                    <Label htmlFor="status">Status:</Label>
                    <Select
                        defaultValue={'all'}
                        onValueChange={setStatus}
                        value={status}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Semua</SelectItem>
                                {['process', 'completed', 'cancelled'].map(
                                    (status) => (
                                        <SelectItem key={status} value={status}>
                                            {translateStatus(status)}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="payment">Pembayaran:</Label>
                    <Select
                        defaultValue={'all'}
                        onValueChange={setPayment}
                        value={payment}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="paid">Lunas</SelectItem>
                                <SelectItem value="unpaid">
                                    Belum Lunas
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="shipping_method">Pengiriman:</Label>
                    <Select
                        defaultValue={'all'}
                        onValueChange={setShippingMethod}
                        value={shippingMethod}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih metode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="delivery">
                                    Diantar
                                </SelectItem>
                                <SelectItem value="pickup">Diambil</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default FiltersSection;
