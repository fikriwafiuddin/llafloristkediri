import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/cash-transactions';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import FormCashTransaction from '../FormCashTransaction';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kas',
        href: index().url,
    },
    {
        title: 'Tambah',
        href: create().url,
    },
];

function CashTransactionCreatePage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kas" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Kas</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Transaksi Kas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormCashTransaction />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default CashTransactionCreatePage;
