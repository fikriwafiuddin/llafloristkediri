import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { show } from '@/routes/schedules';
import { Order } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import UpdateStatus from '../../orders/UpdateStatus';

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
        header: 'Nomor WhatsApp',
    },
    {
        accessorKey: 'schedule',
        header: 'Jadwal',
        cell: ({ row }) => formatDate(row.original.schedule),
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <UpdateStatus order={row.original} />,
    },
    {
        header: 'Aksi',
        cell: ({ row }) => (
            <Link href={show(row.original.id)}>
                <Button variant="outline">
                    <EyeIcon />
                </Button>
            </Link>
        ),
    },
];

export default columns;
