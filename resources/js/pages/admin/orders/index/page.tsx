import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

import { index, pos } from '@/routes/orders';
import { BreadcrumbItem, Order } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import columns from './columns';
import FiltersSection from './FiltersSection';

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
    filters: {
        customer_name: string;
        whatsapp: string;
        year: string;
        month: string;
        status: string;
        payment: string;
        shipping_method: string;
    };
};

function OrderIndexPage({ orders, filters }: OrderIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string } }>().props;

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

                {flash.success && (
                    <Alert>
                        <CheckCircleIcon />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>List Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FiltersSection filters={filters} />

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
