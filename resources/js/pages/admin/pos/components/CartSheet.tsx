import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import useCartStore from '@/hooks/useCartStore';
import { EditIcon, ShoppingCartIcon, XIcon } from 'lucide-react';
import FormCustomItem from './FormCustomItem';

type CartSheetProps = {
    onChangeMode: (mode: 'select' | 'form') => void;
};

function CartSheet({ onChangeMode }: CartSheetProps) {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const items = useCartStore((state) => state.items);
    const deleteItem = useCartStore((state) => state.deleteItem);
    const totalAmount = useCartStore((state) => state.getTotalAmount());
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    return (
        <div className="flex items-center justify-end gap-2">
            <span className="text-sm">
                {totalItems.toLocaleString()} Terpilih
            </span>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="lg">
                        <ShoppingCartIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Keranjang</SheetTitle>
                        <SheetDescription>
                            Item yang sudah dimasukkan ke dalam keranjang
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 overflow-hidden">
                        <div className="flex flex-col gap-2 px-4">
                            {items.map((item, index) =>
                                item.is_custom ? (
                                    <Item
                                        key={item.custom_name}
                                        variant="outline"
                                        className="relative"
                                    >
                                        <Button
                                            className="absolute top-2 right-2"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteItem(index)}
                                        >
                                            <XIcon />
                                        </Button>
                                        <ItemContent>
                                            <ItemTitle className="line-clamp-1">
                                                {item.custom_name}
                                            </ItemTitle>
                                            <p>
                                                Rp{' '}
                                                {(
                                                    item.unit_price *
                                                    item.quantity
                                                ).toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.quantity - 1,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="h-8 text-center"
                                                    disabled
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.quantity + 1,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                                <FormCustomItem
                                                    customItem={{
                                                        custom_name:
                                                            item.custom_name ||
                                                            '',
                                                        custom_description:
                                                            item.custom_description ||
                                                            '',
                                                        unit_price:
                                                            item.unit_price ||
                                                            0,
                                                        quantity:
                                                            item.quantity || 0,
                                                    }}
                                                    type="UPDATE"
                                                    index={index}
                                                >
                                                    <EditIcon />
                                                </FormCustomItem>
                                            </div>
                                        </ItemContent>
                                    </Item>
                                ) : (
                                    <Item
                                        key={
                                            item.product?.id || item.custom_name
                                        }
                                        variant="outline"
                                        className="relative"
                                    >
                                        <Button
                                            className="absolute top-2 right-2"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteItem(index)}
                                        >
                                            <XIcon />
                                        </Button>
                                        <ItemMedia>
                                            <img
                                                className="size-16 rounded-sm"
                                                src={`/storage/${item.product?.image}`}
                                                alt={item.product?.name}
                                            />
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle className="line-clamp-1">
                                                {item.product?.name}
                                            </ItemTitle>
                                            <p>
                                                Rp{' '}
                                                {(
                                                    item.unit_price *
                                                    item.quantity
                                                ).toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.quantity - 1,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="h-8 text-center"
                                                    disabled
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.quantity + 1,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </ItemContent>
                                    </Item>
                                ),
                            )}
                        </div>
                    </ScrollArea>

                    <SheetFooter>
                        <p>Total: Rp {totalAmount.toLocaleString()}</p>
                        <Button
                            disabled={totalItems < 1}
                            onClick={() => onChangeMode('form')}
                        >
                            Lanjutkan
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline">Tutup</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CartSheet;
