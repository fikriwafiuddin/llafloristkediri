import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { translateStatus } from '@/lib/utils';
import { show } from '@/routes/orders';
import { Order } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { EyeIcon, TrashIcon } from 'lucide-react';

const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'customer_name',
        header: 'Nama Pelanggan',
    },
    {
        accessorKey: 'whatsapp_number',
        header: 'No. WhatsApp',
    },
    {
        accessorKey: 'schedule',
        header: 'Jadwal',
        cell: ({ row }) =>
            format(row.original.schedule, 'dd MMMM HH:mm', {
                locale: id,
            }),
    },
    {
        accessorKey: 'total_amount',
        header: 'Total',
        cell: ({ row }) => {
            const amount = row.original.total_amount;
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(amount);
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <Select defaultValue={row.original.status}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
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
            );
        },
    },
    {
        accessorKey: 'shipping_method',
        header: 'Pengiriman',
        cell: ({ row }) => {
            return row.original.shipping_method === 'delivery'
                ? 'Diantar'
                : 'Diambil';
        },
    },
    {
        accessorKey: 'is_paid',
        header: 'Pembayaran',
        cell: ({ row }) => {
            return row.original.is_paid ? (
                <Badge variant="success">Lunas</Badge>
            ) : (
                <Badge variant="destructive">Belum Lunas</Badge>
            );
        },
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Link href={show(row.original.id)}>
                        <Button variant="outline">
                            <EyeIcon />
                        </Button>
                    </Link>
                    <Button variant="destructive">
                        <TrashIcon />
                    </Button>
                </div>
            );
        },
    },
];

export default columns;
