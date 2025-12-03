import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/cash-transactions';
import { BreadcrumbItem, CashTransaction } from '@/types';
import { Head, Link } from '@inertiajs/react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kas',
        href: index().url,
    },
];

type CashTransactionIndexPageProps = {
    cashTransactions: {
        data: CashTransaction[];
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
        current_page: number;
    };
};

function CashTransactionIndexPage({
    cashTransactions,
}: CashTransactionIndexPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Kas</h2>
                    <Link href={create()}>
                        <Button>+ Tambah Transaksi Kas</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>List Transaksi Kas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTable
                            columns={columns}
                            data={cashTransactions.data}
                        />
                        <AppPagination
                            links={cashTransactions.links}
                            current_page={cashTransactions.current_page}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default CashTransactionIndexPage;
