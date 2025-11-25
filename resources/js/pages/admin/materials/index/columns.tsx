import { Button } from '@/components/ui/button';
import { edit } from '@/routes/materials';
import { Material } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import DeleteMaterial from '../DeleteMaterial';

const columns: ColumnDef<Material>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'price',
        header: 'Harga',
        cell: ({ row }) =>
            `Rp ${(row.getValue('price') as number).toLocaleString()}`,
    },
    {
        accessorKey: 'stock',
        header: 'Stok',
        cell: ({ row }) => (row.getValue('stock') as number).toLocaleString(),
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
                    <DeleteMaterial id={id} />
                </div>
            );
        },
    },
];
export default columns;
