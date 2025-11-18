import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import categories, { store } from '@/routes/categories';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori',
        href: categories.index().url,
    },
    {
        title: 'Tambah',
        href: categories.create().url,
    },
];

function CategoryCreatePage() {
    const { submit, data, setData, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(store());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kategori" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Kategori</h2>
                    <Link href={categories.index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Kategori</CardTitle>
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

export default CategoryCreatePage;
