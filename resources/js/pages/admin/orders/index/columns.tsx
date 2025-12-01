import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { edit, show } from '@/routes/orders';
import { Order } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { EditIcon, EyeIcon } from 'lucide-react';
import DeleteOrder from '../DeleteOrder';
import UpdateStatus from '../UpdateStatus';

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
        accessorKey: 'created_at',
        header: 'Dibuat',
        cell: ({ row }) =>
            format(row.original.created_at, 'dd MMMM yyyy HH:mm', {
                locale: id,
            }),
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
            return <UpdateStatus order={row.original} />;
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
            const id = row.original.id;

            return (
                <div className="flex gap-2">
                    <Link href={show(id)}>
                        <Button variant="outline">
                            <EyeIcon />
                        </Button>
                    </Link>
                    <Link href={edit(id)}>
                        <Button>
                            <EditIcon />
                        </Button>
                    </Link>
                    <DeleteOrder id={id} />
                </div>
            );
        },
    },
];

export default columns;
