import { Material } from '@/types';
import { create } from 'zustand';

interface CalculatorItem {
    material: Material;
    quantity: number;
}

interface CalculatorState {
    items: CalculatorItem[];
    addItem: (item: Material, quantity: number) => void;
    deleteItem: (id: number) => void;
    clearCalculator: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    updateQuantity: (id: number, quantity: number) => void;
}

const useCalculatorStore = create<CalculatorState>()((set, get) => ({
    items: [],
    addItem: (item, quantity) => {
        set((state) => {
            const existingItem = state.items.findIndex(
                (val) => val.material.id == item.id,
            );
            if (existingItem > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItem].quantity += quantity;
                return {
                    items: updatedItems,
                };
            }

            return { items: [...state.items, { material: item, quantity }] };
        });
    },
    deleteItem: (id) => {
        set((state) => ({
            items: state.items.filter((item) => item.material.id != id),
        }));
    },
    clearCalculator: () => set({ items: [] }),
    getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    getTotalPrice: () =>
        get().items.reduce(
            (total, item) => total + item.material.price * item.quantity,
            0,
        ),
    updateQuantity: (id, quantity) => {
        set((state) => {
            const indexItem = state.items.findIndex(
                (val) => val.material.id == id,
            );

            if (indexItem > -1) {
                if (quantity == 0) {
                    return {
                        items: state.items.filter(
                            (item) => item.material.id == id,
                        ),
                    };
                } else {
                    const updatedItems = [...state.items];
                    updatedItems[indexItem].quantity = quantity;
                    return { items: updatedItems };
                }
            }
            return state;
        });
    },
}));

export default useCalculatorStore;
