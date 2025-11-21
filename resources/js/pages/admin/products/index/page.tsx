import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import useDebounce from '@/hooks/useDebounce';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/products';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';
import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: index().url,
    },
];

type ProductIndexPageProps = {
    products: {
        data: Product[];
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
        current_page: number;
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
    };
};

function ProductIndexPage({
    products,
    categories,
    filters,
}: ProductIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string } }>().props;
    const initialSearch = filters.search || '';
    const initialCategory = filters.category || '';

    const [search, setSearch] = useState<string>(initialSearch);
    const [category, setCategory] = useState<string>(initialCategory);

    const debouncedSearch = useDebounce(search, 500);
    const debouncedCategory = useDebounce(category, 500);

    const isInitialMount = useRef(true);

    const prevSearch = useRef(initialSearch);
    const prevCategory = useRef(initialCategory);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const searchChanged = debouncedSearch !== prevSearch.current;
        const categoryChanged = debouncedCategory !== prevCategory.current;

        if (searchChanged || categoryChanged) {
            prevSearch.current = String(debouncedSearch);
            prevCategory.current = String(debouncedCategory);

            router.get(
                '/admin/products',
                {
                    search: debouncedSearch || undefined,
                    category: debouncedCategory || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [debouncedSearch, debouncedCategory]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Produk</h2>
                    <Link href={create()}>
                        <Button>+ Tambah Produk</Button>
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
                        <CardTitle>List Produk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex w-full flex-col gap-4 sm:flex-row">
                            <div className="w-full">
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari produk"
                                />
                            </div>
                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Semua
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={
                                                    'category-filter' +
                                                    category.id
                                                }
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <DataTable columns={columns} data={products.data} />
                        <AppPagination
                            links={products.links}
                            current_page={products.current_page}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default ProductIndexPage;
