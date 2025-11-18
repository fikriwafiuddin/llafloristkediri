import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/categories';
import { BreadcrumbItem, Category } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { FormEvent } from 'react';

const breadcrumbs = (id: number): BreadcrumbItem[] => {
    return [
        {
            title: 'Kategori',
            href: index().url,
        },
        {
            title: 'Update',
            href: update(id).url,
        },
    ];
};

type CategoryUpdatePageProps = {
    category: Category;
};

function CategoryUpdatePage({ category }: CategoryUpdatePageProps) {
    const { submit, data, setData, processing, errors } = useForm({
        name: category.name,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(update(category.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(category.id)}>
            <Head title="Tambah Kategori" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Kategori</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Update Kategori</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className={
                                            errors.name
                                                ? 'text-destructive'
                                                : ''
                                        }
                                    >
                                        Nama
                                    </Label>
                                    <Input
                                        name="name"
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className={
                                            errors.name
                                                ? 'border-destructive focus-visible:ring-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.name && (
                                        <span className="text-sm text-destructive">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>
                                <Button type="submit" disabled={processing}>
                                    {processing ? <Spinner /> : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default CategoryUpdatePage;
