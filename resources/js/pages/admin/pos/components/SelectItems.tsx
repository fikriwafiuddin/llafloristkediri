import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useDebounce from '@/hooks/useDebounce';
import { create } from '@/routes/orders';
import { Category, Product } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import CartSheet from './CartSheet';
import AddCustomItemCart from './FormCustomItem';
import ProductCard from './ProductCard';

type SelectItemsProps = {
    onChangeMode: (mode: 'select' | 'form') => void;
    products: {
        data: Product[];
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
    };
};

function SelectItems({
    onChangeMode,
    products,
    categories,
    filters,
}: SelectItemsProps) {
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
                create().url,
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
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Filter</CardTitle>
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
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Semua</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={
                                                'category-filter' + category.id
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
                </CardContent>
            </Card>

            <CartSheet onChangeMode={onChangeMode} />

            <div className="space-y-2">
                <AddCustomItemCart type="ADD">
                    Tambah Custom Item
                </AddCustomItemCart>

                <div className="grid grid-cols-4 gap-2">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SelectItems;
