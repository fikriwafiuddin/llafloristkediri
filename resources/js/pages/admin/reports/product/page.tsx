import StatCard from '@/components/stat-card';
import { Button } from '@/components/ui/button';

import AppLayout from '@/layouts/app-layout';
import { index, product } from '@/routes/reports';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DownloadIcon, FlowerIcon } from 'lucide-react';
import FiltersSection from './FiltersSection';
import LowestProducts from './LowestProducts';
import TopProducts from './TopProducts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: index().url,
    },
    {
        title: 'Produk',
        href: product().url,
    },
];

type ReportProducPageProps = {
    topProducts: {
        product_id: number | null;
        name: string;
        total_orders: number;
        total_quantity: number;
        is_custom: boolean;
    }[];
    lowestProducts: {
        product_id: number | null;
        name: string;
        total_orders: number;
        total_quantity: number;
        is_custom: boolean;
    }[];
    filters: {
        year: string;
        month: string;
    };
};

function ReportProducPage({
    topProducts,
    lowestProducts,
    filters,
}: ReportProducPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Produk" />
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-semibold">Laporan Produk</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <StatCard
                        title="Total Produk"
                        value={10}
                        icon={FlowerIcon}
                    />
                </div>

                <div className="flex justify-end">
                    <Button>
                        Unduh Data Produk <DownloadIcon />
                    </Button>
                </div>

                <FiltersSection filters={filters} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <TopProducts topProducts={topProducts} />
                    <LowestProducts lowestProducts={lowestProducts} />
                </div>
            </div>
        </AppLayout>
    );
}

export default ReportProducPage;
