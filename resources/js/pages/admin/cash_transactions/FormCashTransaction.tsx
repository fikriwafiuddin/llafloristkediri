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
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/cash-transactions';
import { CashTransaction } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ClockIcon } from 'lucide-react';

type FormCashTransactionProps = {
    cashTransaction?: CashTransaction;
};

function FormCashTransaction({ cashTransaction }: FormCashTransactionProps) {
    const { submit, data, setData, processing, errors } = useForm({
        type: cashTransaction?.type || 'income',
        category: cashTransaction?.category || '',
        amount: cashTransaction?.amount || 0,
        transaction_date: cashTransaction?.transaction_date
            ? new Date(cashTransaction.transaction_date)
            : new Date(),
        description: cashTransaction?.description || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(store());
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <Label
                            className={errors.type ? 'text-destructive' : ''}
                            htmlFor="type"
                        >
                            Tipe
                        </Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) =>
                                setData('type', value as 'income' | 'expense')
                            }
                        >
                            <SelectTrigger
                                id="type"
                                name="type"
                                className={`w-full ${
                                    errors.type
                                        ? 'border-destructive focus-visible:ring-destructive'
                                        : ''
                                } `}
                            >
                                <SelectValue placeholder="Pilih Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="income">
                                        Pemasukan
                                    </SelectItem>
                                    <SelectItem value="expense">
                                        Pengeluaran
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    <div>
                        <Label
                            className={
                                errors.category ? 'text-destructive' : ''
                            }
                            htmlFor="category"
                        >
                            Kategori
                        </Label>
                        <Input
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) =>
                                setData('category', e.target.value)
                            }
                            className={
                                errors.category
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : ''
                            }
                        />
                        <InputError message={errors.category} />
                    </div>
                </div>

                <div>
                    <Label
                        className={errors.amount ? 'text-destructive' : ''}
                        htmlFor="amount"
                    >
                        Jumlah
                    </Label>
                    <Input
                        type="number"
                        id="amount"
                        name="amount"
                        value={data.amount.toString()}
                        onChange={(e) =>
                            setData('amount', Number(e.target.value))
                        }
                        className={
                            errors.amount
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    <InputError message={errors.amount} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="date">Tanggal</Label>
                        <DatePicker
                            onChange={(date: Date) =>
                                setData('transaction_date', date)
                            }
                            value={data.transaction_date}
                        />
                    </div>
                    <div className="relative">
                        <Label htmlFor="time">Waktu</Label>
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={
                                data.transaction_date
                                    ? format(data.transaction_date, 'HH:mm')
                                    : ''
                            }
                            onChange={(e) =>
                                setData(
                                    'transaction_date',
                                    new Date(
                                        data.transaction_date
                                            ? format(
                                                  data.transaction_date,
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
                        htmlFor="description"
                        className={errors.description ? 'text-destructive' : ''}
                    >
                        Deskripsi
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Masukkan deskripsi"
                        className={`min-h-40 ${
                            errors.description
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }`}
                    />
                    {errors.description && (
                        <span className="text-sm text-destructive">
                            {errors.description}
                        </span>
                    )}
                </div>

                <Button type="submit" disabled={processing}>
                    {processing ? <Spinner /> : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}

export default FormCashTransaction;
