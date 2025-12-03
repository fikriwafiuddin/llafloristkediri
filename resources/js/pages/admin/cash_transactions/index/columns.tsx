import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CashTransaction } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';

const columns: ColumnDef<CashTransaction>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'type',
        header: 'Tipe',
        cell: ({ row }) =>
            row.getValue('type') === 'income' ? 'Pemasukan' : 'Pengeluaran',
    },
    {
        accessorKey: 'category',
        header: 'Kategori',
        cell: ({ row }) =>
            (row.getValue('category') as string).toLocaleLowerCase() == 'order'
                ? 'Pesanan'
                : row.getValue('category'),
    },
    {
        accessorKey: 'amount',
        header: 'Jumlah',
        cell: ({ row }) => formatCurrency(row.getValue('amount')),
    },
    {
        accessorKey: 'transaction_date',
        header: 'Tanggal Transaksi',
        cell: ({ row }) => formatDate(row.getValue('transaction_date')),
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            const cashTransaction = row.original;
            if (!cashTransaction.order_id) {
                return (
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <EyeIcon />
                        </Button>
                        <Link
                            href={`/admin/orders/${cashTransaction.order_id}`}
                        >
                            <Button>
                                <EditIcon />
                            </Button>
                        </Link>
                        <Button variant="destructive">
                            <TrashIcon />
                        </Button>
                    </div>
                );
            }
            return;
        },
    },
];

export default columns;
