export type OrderChartData = {
    data: string;
    order: number;
};

export type CashTransactionChartData = {
    day: string;
    income: number;
    expense: number;
};

export type TopProduct = {
    product_id: number | null;
    name: string;
    total_orders: number;
    total_quantity: number;
    is_custom: boolean;
};
