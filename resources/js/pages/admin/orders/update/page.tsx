import FormOrder from '@/components/form-order';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/orders';
import { BreadcrumbItem, Order, OrderItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    {
        title: 'Pesanan',
        href: index().url,
    },
    {
        title: 'Update',
        href: edit(id).url,
    },
];

type OrderUpdatePageProps = {
    order: Order & { order_items: OrderItem[] };
};

function OrderUpdatePage({ order }: OrderUpdatePageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(order.id)}>
            <Head title="Update Produk" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Pesanan</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Update Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormOrder order={order} type="UPDATE" />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default OrderUpdatePage;
