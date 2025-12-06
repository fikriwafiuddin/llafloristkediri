import StatCard from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { excel } from '@/routes/cash-transactions/export';
import { cashTransaction, index } from '@/routes/reports';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CircleArrowDown,
    CircleArrowUp,
    CircleMinusIcon,
    DownloadIcon,
} from 'lucide-react';
import CashTransactionChart from './CashTransactionChart';
import FiltersSection from './FiltersSection';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: index().url,
    },
    {
        title: 'Kas',
        href: cashTransaction().url,
    },
];

type ReportCashTransactionPageProps = {
    summary: {
        totalIncome: number;
        totalExpense: number;
    };
    cashTransactionChart: {
        date: string;
        income: number;
        expense: number;
    }[];
    filters: {
        year: string;
        month: string;
    };
};

function ReportCashTransactionPage({
    summary,
    cashTransactionChart,
    filters,
}: ReportCashTransactionPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Produk" />
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-semibold">
                    Laporan Transaksi Kas
                </h2>

                <FiltersSection filters={filters} />

                <div className="flex justify-end">
                    <Button asChild>
                        <a
                            href={`${excel().url}?year=${filters.year || new Date().getFullYear()}&month=${filters.month || new Date().getMonth() + 1}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Unduh Data Kas <DownloadIcon />
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <StatCard
                        title="Selisih"
                        value={summary.totalIncome - summary.totalExpense}
                        icon={CircleMinusIcon}
                        isCurrency
                    />
                    <StatCard
                        title="Pemasukan"
                        value={summary.totalIncome}
                        icon={CircleArrowDown}
                        isCurrency
                    />
                    <StatCard
                        title="Pengeluaran"
                        value={summary.totalExpense}
                        icon={CircleArrowUp}
                        isCurrency
                    />
                </div>

                <CashTransactionChart chartData={cashTransactionChart} />
            </div>
        </AppLayout>
    );
}

export default ReportCashTransactionPage;
