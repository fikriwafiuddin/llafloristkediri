import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { store, update } from '@/routes/testimonials';
import { Testimony } from '@/types';
import { useForm } from '@inertiajs/react';
import { SelectGroup, SelectValue } from '@radix-ui/react-select';
import { FormEvent } from 'react';

type FormTestimonyProps = {
    testimony?: Testimony;
};

function FormTestimony({ testimony }: FormTestimonyProps) {
    const { data, submit, setData, processing, errors, isDirty } = useForm({
        customer_name: testimony?.customer_name || '',
        rating: testimony?.rating.toString() || '1',
        customer_status: testimony?.customer_status || '',
        review: testimony?.review || '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (testimony) {
            submit(update(testimony?.id));
        } else {
            submit(store());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="customer_name"
                            className={
                                errors.customer_name ? 'text-destructive' : ''
                            }
                        >
                            Nama Pelanggan
                        </Label>
                        <Input
                            name="customer_name"
                            id="customer_name"
                            type="text"
                            value={data.customer_name}
                            onChange={(e) =>
                                setData('customer_name', e.target.value)
                            }
                            className={
                                errors.customer_name
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : ''
                            }
                            placeholder="Masukkan nama"
                        />
                        {errors.customer_name && (
                            <span className="text-sm text-destructive">
                                {errors.customer_name}
                            </span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Select
                            value={data.rating}
                            onValueChange={(value) => setData('rating', value)}
                        >
                            <SelectTrigger
                                id="rating"
                                name="rating"
                                className={`w-full ${
                                    errors.rating
                                        ? 'border-destructive focus-visible:ring-destructive'
                                        : ''
                                } `}
                            >
                                <SelectValue placeholder="Pilih rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.rating && (
                            <span className="text-sm text-destructive">
                                {errors.rating}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <Label
                        htmlFor="customer_status"
                        className={
                            errors.customer_status ? 'text-destructive' : ''
                        }
                    >
                        Status Pelanggan
                    </Label>
                    <Input
                        name="customer_status"
                        id="customer_status"
                        type="text"
                        value={data.customer_status}
                        onChange={(e) =>
                            setData('customer_status', e.target.value)
                        }
                        className={
                            errors.customer_status
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                        placeholder="Masukkan status pelanggan"
                    />
                    {errors.customer_status && (
                        <span className="text-sm text-destructive">
                            {errors.customer_status}
                        </span>
                    )}
                </div>

                <div>
                    <Label htmlFor="review">Ulasan</Label>
                    <Textarea
                        id="review"
                        name="review"
                        value={data.review}
                        onChange={(e) => setData('review', e.target.value)}
                        className={
                            errors.review
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    {errors.review && (
                        <span className="text-sm text-destructive">
                            {errors.review}
                        </span>
                    )}
                </div>

                <Button type="submit" disabled={processing || !isDirty}>
                    {processing ? <Spinner /> : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}

export default FormTestimony;
