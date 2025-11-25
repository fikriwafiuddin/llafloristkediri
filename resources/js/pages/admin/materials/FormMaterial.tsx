import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store, update } from '@/routes/materials';
import { Material } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type FormMaterialProps = {
    material?: Material;
};

function FormMaterial({ material }: FormMaterialProps) {
    const { data, setData, processing, submit, errors } = useForm({
        name: material?.name || '',
        price: material?.price || '',
        stock: material?.stock || '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (material) {
            submit(update(material.id));
        } else {
            submit(store());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="name"
                        className={errors.name ? 'text-destructive' : ''}
                    >
                        Nama Bahan
                    </Label>
                    <Input
                        name="name"
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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

                <div>
                    <Label
                        htmlFor="price"
                        className={errors.price ? 'text-destructive' : ''}
                    >
                        Harga
                    </Label>
                    <Input
                        name="price"
                        id="price"
                        type="text"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
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

                <div>
                    <Label
                        htmlFor="stock"
                        className={errors.stock ? 'text-destructive' : ''}
                    >
                        Stok
                    </Label>
                    <Input
                        name="stock"
                        id="stock"
                        type="text"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className={
                            errors.stock
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                        placeholder="Masukkan stok"
                    />
                    {errors.stock && (
                        <span className="text-sm text-destructive">
                            {errors.stock}
                        </span>
                    )}
                </div>

                <Button type="submit" disabled={processing}>
                    {processing ? <Spinner /> : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}

export default FormMaterial;
