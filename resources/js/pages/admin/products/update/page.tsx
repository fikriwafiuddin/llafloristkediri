import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/upload-file';
import AppLayout from '@/layouts/app-layout';
import { edit, index, update } from '@/routes/products';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, FileText } from 'lucide-react';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    {
        title: 'Produk',
        href: index().url,
    },
    {
        title: 'Tambah',
        href: edit(id).url,
    },
];

type ProductUpdatePageProps = {
    product: Product;
    categories: Category[];
};

function ProductUpdatePage({ product, categories }: ProductUpdatePageProps) {
    const { post, data, setData, processing, errors } = useForm<{
        name: string;
        image: null | File;
        price: string;
        category_id: string;
        description: string;
        _method: string;
    }>({
        name: product.name || '',
        image: null,
        price: product.price.toString() || '',
        category_id: product.category_id.toString() || '',
        description: product.description || '',
        _method: 'PUT',
    });
    const [prevImage, setPrevImage] = useState<null | string>(
        product.image ? `/storage/${product.image}` : null,
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        type FormKeys = keyof typeof data;

        (Object.keys(data) as FormKeys[]).forEach((key) => {
            const value = data[key];
            if (value !== null && value !== undefined) {
                formData.append(
                    key,
                    value instanceof File ? value : value.toString(),
                );
            }
        });

        post(update(product.id).url, {
            forceFormData: true,
            onSuccess: () => toast.error('Produk berhasil diupdate'),
        });
    };

    const handleFileSelect = (file: File) => {
        // Lakukan validasi ukuran/tipe di sini jika diperlukan
        setData('image', file);
        createPreview(file);
        console.log(`File dipilih: ${file.name}`);
    };

    const createPreview = useCallback((file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs(product.id)}>
            <Head title="Update Produk" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Produk</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Update Produk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="image">Gambar</Label>
                                    <FileUpload
                                        id="image"
                                        name="image"
                                        onFileSelect={handleFileSelect}
                                        previewUrl={prevImage}
                                        acceptedFileTypes="image/jpg, image/jpeg, image/png, image/webp"
                                        fileRestrictionsText="Max 2MB, jpg, jpeg, png, webp"
                                    />
                                    {data?.image && (
                                        <p className="mt-2 text-sm">
                                            <FileText className="mr-1 inline h-4 w-4" />
                                            **File yang dipilih:**{' '}
                                            {data.image.name}(
                                            {(
                                                data.image.size /
                                                (1024 * 1024)
                                            ).toFixed(2)}{' '}
                                            MB)
                                        </p>
                                    )}
                                    {errors.image && (
                                        <span className="text-sm text-destructive">
                                            {errors.image}
                                        </span>
                                    )}
                                </div>

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
                                        placeholder="Masukkan nama"
                                    />
                                    {errors.name && (
                                        <span className="text-sm text-destructive">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label
                                            htmlFor="category_id"
                                            className={
                                                errors.category_id
                                                    ? 'text-destructive'
                                                    : ''
                                            }
                                        >
                                            Kategori
                                        </Label>
                                        <Select
                                            value={data.category_id}
                                            onValueChange={(value) =>
                                                setData('category_id', value)
                                            }
                                        >
                                            <SelectTrigger
                                                id="category_id"
                                                name="category_id"
                                                className={`w-full ${
                                                    errors.price
                                                        ? 'border-destructive focus-visible:ring-destructive'
                                                        : ''
                                                } `}
                                            >
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    'select-categori-' +
                                                                    category.id
                                                                }
                                                                value={category.id.toString()}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && (
                                            <span className="text-sm text-destructive">
                                                {errors.category_id}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="price"
                                            className={
                                                errors.price
                                                    ? 'text-destructive'
                                                    : ''
                                            }
                                        >
                                            Harga
                                        </Label>
                                        <Input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData('price', e.target.value)
                                            }
                                            onWheel={(e) =>
                                                e.currentTarget.blur()
                                            }
                                            className={
                                                errors.price
                                                    ? 'border-destructive focus-visible:ring-destructive'
                                                    : ''
                                            }
                                            placeholder="Masukkan harga"
                                        />
                                        {errors.price && (
                                            <span className="text-sm text-destructive">
                                                {errors.price}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="description"
                                        className={
                                            errors.description
                                                ? 'text-destructive'
                                                : ''
                                        }
                                    >
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Masukkan deskripsi"
                                        className={`min-h-40 ${
                                            errors.price
                                                ? 'border-destructive focus-visible:ring-destructive'
                                                : ''
                                        }`}
                                    />
                                    {errors.description && (
                                        <span className="text-sm text-destructive">
                                            {errors.description}
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

export default ProductUpdatePage;
