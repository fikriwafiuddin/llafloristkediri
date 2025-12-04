import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDate } from '@/lib/utils';
import { index, show } from '@/routes/cash-transactions';
import { BreadcrumbItem, CashTransaction } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    {
        title: 'Kas',
        href: index().url,
    },
    {
        title: 'Detail',
        href: show(id).url,
    },
];

type CashTransactionShowPageProps = {
    cashTransaction: CashTransaction;
};

function CashTransactionShowPage({
    cashTransaction,
}: CashTransactionShowPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(cashTransaction.id)}>
            <Head title="Pesanan" />
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
                        <CardTitle>Detail Transaksi Kas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid max-w-sm grid-cols-2 items-center gap-y-1 text-sm">
                            <p className="text-muted-foreground">ID:</p>
                            <p>{cashTransaction.id}</p>
                            <p className="text-muted-foreground">Tipe:</p>
                            {cashTransaction.type == 'income' ? (
                                <Badge variant="success">Pemasukan</Badge>
                            ) : (
                                <Badge variant="destructive">Pengeluaran</Badge>
                            )}
                            <p className="text-muted-foreground">Kategori:</p>
                            <p>
                                {cashTransaction.category == 'order'
                                    ? 'Pesanan'
                                    : cashTransaction.category}
                            </p>
                            <p className="text-muted-foreground">Total:</p>
                            <p>{formatCurrency(cashTransaction.amount)}</p>
                            <p className="text-muted-foreground">Tanggal:</p>
                            <p>
                                {formatDate(cashTransaction.transaction_date)}
                            </p>
                            <p className="text-muted-foreground">Deskripsi:</p>
                            <p className="col-span-2">
                                {cashTransaction.description
                                    ? cashTransaction.description
                                    : '-'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default CashTransactionShowPage;
