import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/cash-transactions';
import { BreadcrumbItem, CashTransaction } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import columns from './columns';
import FiltersSection from './FiltersSection';

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
    filters: {
        year: string;
        month: string;
        type: string;
    };
};

function CashTransactionIndexPage({
    cashTransactions,
    filters,
}: CashTransactionIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string; error: string } }>()
        .props;

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

                {flash.success && (
                    <Alert>
                        <CheckCircleIcon />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {flash.error && (
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>List Transaksi Kas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FiltersSection filters={filters} />
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
