import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/orders';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FormOrder from './components/FormOrder';
import SelectItems from './components/SelectItems';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: create().url,
    },
];

type PosPageProps = {
    products: {
        data: Product[];
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
    };
};

function PosPage({ products, categories, filters }: PosPageProps) {
    const [mode, setMode] = useState<'select' | 'form'>('select');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="space-y-4 p-4">
                {mode == 'select' && (
                    <SelectItems
                        onChangeMode={setMode}
                        products={products}
                        categories={categories}
                        filters={filters}
                    />
                )}

                {mode == 'form' && <FormOrder onChangeMode={setMode} />}
            </div>
        </AppLayout>
    );
}

export default PosPage;
