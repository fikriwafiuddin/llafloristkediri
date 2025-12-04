import RatingStarts from '@/components/rating-starts';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { edit } from '@/routes/testimonials';
import { Testimony } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import DeleteTestimony from '../DeleteTestimony';
import DetailTestimony from '../DetailTestimony';

const columns: ColumnDef<Testimony>[] = [
    {
        accessorKey: 'customer_name',
        header: 'Nama Pelanggan',
    },
    {
        accessorKey: 'customer_status',
        header: 'Status Pelanggan',
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ row }) => {
            const rating = row.getValue('rating') as number;
            return <RatingStarts rating={rating} />;
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Dibuat',
        cell: ({ row }) => formatDate(row.getValue('created_at')),
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            const testimony = row.original;

            return (
                <div className="flex gap-2">
                    <DetailTestimony testimony={testimony} />

                    <Link href={edit(testimony.id)}>
                        <Button>
                            <PencilIcon />
                        </Button>
                    </Link>

                    <DeleteTestimony id={testimony.id} />
                </div>
            );
        },
    },
];
export default columns;
