import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/categories';
import { BreadcrumbItem, Category } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori',
        href: index().url,
    },
];

type CategoryIndexPageProps = {
    categories: Category[];
};

function CategoryIndexPage({ categories }: CategoryIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Kategori</h2>
                    <Link href={create()}>
                        <Button>+ Tambah Kategori</Button>
                    </Link>
                </div>

                {flash.success && (
                    <Alert>
                        <CheckCircleIcon />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>List Kategori</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={categories} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default CategoryIndexPage;
