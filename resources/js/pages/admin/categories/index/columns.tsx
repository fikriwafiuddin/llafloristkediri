import { Button } from '@/components/ui/button';
import categories from '@/routes/categories';
import { Category } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import DeleteCategory from '../DeleteCategory';

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            const id = row.getValue('id') as number;
            return (
                <div className="flex gap-2">
                    <Link href={categories.edit(id)}>
                        <Button>
                            <PencilIcon />
                        </Button>
                    </Link>
                    <DeleteCategory id={id} />
                </div>
            );
        },
    },
];

export default columns;
