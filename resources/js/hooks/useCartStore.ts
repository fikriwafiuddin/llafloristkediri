import { Product } from '@/types';
import { create } from 'zustand';

interface CartItem {
    product: Product | null;
    is_custom: boolean;
    custom_name: string | null;
    custom_description: string | null;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

interface CartState {
    items: CartItem[];
    addItem: (
        item: Omit<CartItem, 'subtotal' | 'quantity'>,
        quantity: number,
    ) => void;
    updateCustomItem: (
        {
            custom_name,
            custom_description,
            unit_price,
            quantity,
        }: {
            custom_name: string;
            custom_description: string;
            unit_price: number;
            quantity: number;
        },
        index: number,
    ) => void;
    deleteItem: (index: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalAmount: () => number;
    updateQuantity: (quantity: number, index: number) => void;
}

const useCartStore = create<CartState>()((set, get) => ({
    items: [],
    addItem: (item, quantity) => {
        set((state) => {
            if (item.is_custom) {
                return {
                    items: [
                        ...state.items,
                        {
                            ...item,
                            product: null,
                            subtotal: quantity * item.unit_price,
                            quantity,
                        },
                    ],
                };
            } else {
                const existingItem = state.items.findIndex(
                    (val) => val.product?.id == item.product?.id,
                );

                if (existingItem > -1) {
                    const updatedItems = [...state.items];
                    updatedItems[existingItem].quantity += quantity;
                    updatedItems[existingItem].subtotal +=
                        quantity * (item.product?.price ?? 0);
                    return { items: updatedItems };
                } else {
                    return {
                        items: [
                            ...state.items,
                            {
                                ...item,
                                quantity,
                                unit_price: item.product?.price ?? 0,
                                subtotal: quantity * (item.product?.price ?? 0),
                            },
                        ],
                    };
                }
            }
        });
    },
    updateCustomItem: (data, index) => {
        set((state) => {
            const item = state.items[index];

            if (item) {
                const updatedItems = [...state.items];
                updatedItems[index].custom_name = data.custom_name;
                updatedItems[index].custom_description =
                    data.custom_description;
                updatedItems[index].unit_price = data.unit_price;
                updatedItems[index].quantity = data.quantity;
                return { items: [...updatedItems] };
            }

            return state;
        });
    },
    deleteItem: (index) => {
        set((state) => ({
            items: state.items.filter((_, i) => i !== index),
        }));
    },
    clearCart: () => set({ items: [] }),
    getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    getTotalAmount: () =>
        get().items.reduce(
            (total, item) => total + item.unit_price * item.quantity,
            0,
        ),
    updateQuantity: (quantity, index) => {
        set((state) => {
            const item = state.items[index];
            if (item) {
                if (quantity == 0) {
                    return { items: state.items.filter((_, i) => i !== index) };
                } else {
                    const updatedItems = [...state.items];
                    updatedItems[index].quantity = quantity;
                    return { items: updatedItems };
                }
            }
            return state;
        });
    },
}));

export default useCartStore;
