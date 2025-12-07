import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/materials';
import { BreadcrumbItem, Material } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CalculatorSheet from './CalculatorSheet';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: index().url,
    },
];

type MaterialIndexPageProps = {
    materials: {
        data: Material[];
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
        current_page: number;
    };
    filters: {
        search: string;
    };
};

function MaterialIndexPage({ materials, filters }: MaterialIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string } }>().props;
    const initialSearch = filters.search || '';
    const [search, setSearch] = useState<string>(initialSearch);

    const debouncedSearch = useDebounce(search, 500);

    const isInitialMount = useRef(true);

    const prevSearch = useRef(initialSearch);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const searchChanged = debouncedSearch !== prevSearch.current;

        if (searchChanged) {
            prevSearch.current = String(debouncedSearch);

            router.get(
                index().url,
                {
                    search: debouncedSearch || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [debouncedSearch]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Bahan</h2>
                    <Link href={create()}>
                        <Button>+ Tambah Bahan</Button>
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
                        <CardTitle>List Bahan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex w-full flex-col gap-4 sm:flex-row">
                            <div className="w-full">
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari bahan"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <CalculatorSheet />
                        </div>

                        <DataTable data={materials.data} columns={columns} />
                        <AppPagination
                            current_page={materials.current_page}
                            links={materials.links}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default MaterialIndexPage;
