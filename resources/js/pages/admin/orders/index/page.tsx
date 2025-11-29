import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index, pos } from '@/routes/orders';
import { BreadcrumbItem, Order } from '@/types';
import { Head, Link } from '@inertiajs/react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: index().url,
    },
];

type OrderIndexPageProps = {
    orders: {
        data: Order[];
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
        current_page: number;
    };
};

function OrderIndexPage({ orders }: OrderIndexPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Pesanan</h2>
                    <Link href={pos()}>
                        <Button>+ Tambah Pesanan</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>List Produk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTable columns={columns} data={orders.data} />
                        <AppPagination
                            links={orders.links}
                            current_page={orders.current_page}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default OrderIndexPage;
