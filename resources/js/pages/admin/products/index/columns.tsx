import { Button } from '@/components/ui/button';
import { edit } from '@/routes/products';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import DeleteProduct from '../DeleteProduct';

const columns: ColumnDef<Product>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Gambar',
        accessorKey: 'image',
        cell: ({ row }) => (
            <img
                src={`/storage/${row.getValue('image')}`}
                alt="gambar"
                className="size-8 rounded-sm"
            />
        ),
    },
    {
        header: 'Nama',
        accessorKey: 'name',
    },
    {
        header: 'Harga',
        accessorKey: 'price',
        cell: ({ row }) =>
            `Rp ${(row.getValue('price') as number).toLocaleString()}`,
    },
    {
        header: 'Kategori',
        accessorKey: 'category',
        cell: ({ row }) => {
            const { category } = row.original;
            return category?.name;
        },
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            const id = row.getValue('id') as number;

            return (
                <div className="flex gap-2">
                    <Link href={edit(id)}>
                        <Button>
                            <EditIcon />
                        </Button>
                    </Link>
                    <DeleteProduct id={id} />
                </div>
            );
        },
    },
];
export default columns;
