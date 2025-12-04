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
import { index } from '@/routes/cash-transactions';
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
        year: string;
        month: string;
        type: string;
    };
};

function FiltersSection({ filters }: FiltersSectionProps) {
    const initialYear = filters.year || new Date().getFullYear().toString();
    const initialMonth = filters.month || new Date().getMonth().toString();
    const initialType = filters.type || 'all';

    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const [type, setType] = useState(initialType);

    const debouncedYear = useDebounce(year, 500);
    const debouncedMonth = useDebounce(month, 500);
    const deboundedType = useDebounce(type, 500);

    const isInitialMount = useRef(true);

    const prevYear = useRef(initialYear);
    const prevMonth = useRef(initialMonth);
    const prevType = useRef(initialType);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const yearChanged = debouncedYear !== prevYear.current;
        const monthChanged = debouncedMonth !== prevMonth.current;
        const typeChanged = deboundedType !== prevType.current;

        if (yearChanged || monthChanged || typeChanged) {
            router.get(index().url, {
                year: debouncedYear,
                month: debouncedMonth,
                type: deboundedType,
            });
        }
    }, [debouncedMonth, debouncedYear, deboundedType]);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <Label htmlFor="year">Tahun:</Label>
                <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[
                                ...Array(new Date().getFullYear() - 2020 + 1),
                            ].map((_, i) => {
                                const yearStr = (2020 + i).toString();
                                return (
                                    <SelectItem key={yearStr} value={yearStr}>
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
                                        value={(index + 1).toString()}
                                    >
                                        {monthName}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="type">Tipe:</Label>
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Semua</SelectItem>
                            <SelectItem value="income">Pemasukan</SelectItem>
                            <SelectItem value="expense">Pengeluaran</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default FiltersSection;
