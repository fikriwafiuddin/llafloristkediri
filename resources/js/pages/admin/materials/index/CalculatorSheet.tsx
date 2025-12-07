import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
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
import useCalculatorStore from '@/hooks/useCalculatorStore';
import { formatCurrency } from '@/lib/utils';
import { CalculatorIcon, XIcon } from 'lucide-react';

function CalculatorSheet() {
    const totalItems = useCalculatorStore((state) => state.getTotalItems());
    const items = useCalculatorStore((state) => state.items);
    const deleteItem = useCalculatorStore((state) => state.deleteItem);
    const updateQuantity = useCalculatorStore((state) => state.updateQuantity);
    const totalPrice = useCalculatorStore((state) => state.getTotalPrice());
    const clearCalculator = useCalculatorStore(
        (state) => state.clearCalculator,
    );

    return (
        <div className="flex items-center justify-end gap-2">
            <span className="text-sm">
                {totalItems.toLocaleString()} Kalkulator
            </span>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <CalculatorIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Kalkulator</SheetTitle>
                        <SheetDescription>
                            Item yang sudah dimasukkan ke dalam kalkulator
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 overflow-hidden">
                        {items.length < 1 && (
                            <p className="p-4 text-center text-sm text-muted-foreground">
                                Kalkulator kosong
                            </p>
                        )}

                        <div className="flex flex-col gap-2 px-4">
                            {items.map((item) => (
                                <Item
                                    key={item.material.id}
                                    variant="outline"
                                    className="relative"
                                >
                                    <Button
                                        className="absolute top-2 right-2"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                            deleteItem(item.material.id)
                                        }
                                    >
                                        <XIcon />
                                    </Button>
                                    <ItemContent>
                                        <ItemTitle className="line-clamp-1">
                                            {item.material?.name}
                                        </ItemTitle>
                                        <p>
                                            {formatCurrency(
                                                item.material.price *
                                                    item.quantity,
                                            )}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.material.id,
                                                        item.quantity - 1,
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
                                                        item.material.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </ItemContent>
                                </Item>
                            ))}
                        </div>
                    </ScrollArea>

                    <SheetFooter>
                        <p>Total: {formatCurrency(totalPrice)}</p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={clearCalculator}
                        >
                            Reset
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

export default CalculatorSheet;
