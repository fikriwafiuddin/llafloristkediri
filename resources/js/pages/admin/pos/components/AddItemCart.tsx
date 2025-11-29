import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useCartStore from '@/hooks/useCartStore';
import { Product } from '@/types';
import { useState } from 'react';

type AddItemCartProps = {
    product: Product;
};

function AddItemCart({ product }: AddItemCartProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const handleIncrement = () => {
        if (quantity) {
            setQuantity((prev) => prev + 1);
        } else {
            setQuantity(1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddItem = () => {
        if (quantity >= 1) {
            addItem(
                {
                    product,
                    is_custom: false,
                    custom_name: null,
                    custom_description: null,
                    unit_price: product.price,
                },
                quantity,
            );
            setOpen(false);
        }
    };

    return (
        <>
            <Button className="w-full" onClick={() => setOpen(true)}>
                Tambah Keranjang
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Item</DialogTitle>
                        <DialogDescription>
                            Menambahkan "{product.name}" ke keranjang
                        </DialogDescription>
                    </DialogHeader>
                    <p className="grid grid-cols-[80px_1fr]">
                        <span>Nama</span>
                        <span className="col-span-1">: {product.name}</span>
                        <span>Harga</span>
                        <span className="col-span-1">
                            : Rp {product.price.toLocaleString()}
                        </span>
                        <span>Subtotal</span>
                        <span className="col-span-1">
                            : Rp{' '}
                            {quantity
                                ? (product.price * quantity).toLocaleString()
                                : '-'}
                        </span>
                    </p>
                    <div className="flex gap-2">
                        <Button
                            disabled={quantity <= 1 || !quantity}
                            variant="outline"
                            onClick={handleDecrement}
                        >
                            -
                        </Button>
                        <Input
                            type="number"
                            className="text-center"
                            value={quantity.toString()}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                            min={1}
                        />
                        <Button variant="outline" onClick={handleIncrement}>
                            +
                        </Button>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button
                            disabled={quantity < 0 || !quantity}
                            onClick={handleAddItem}
                        >
                            Tambahkan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AddItemCart;
