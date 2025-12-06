import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
    Orders: {
        label: 'Orders',
    },
    delivery: {
        label: 'Diantar',
        color: 'var(--chart-3)',
    },
    pickup: {
        label: 'Dikirim',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

type ShippingMethodChartProps = {
    shippingMethodChart: {
        shipping_method: string;
        orders: number;
        fill: string;
    }[];
};

function ShippingMethodChart({
    shippingMethodChart,
}: ShippingMethodChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Grafik Metode Pengiriman</CardTitle>
                <CardDescription>
                    Grafik perbandingan metode pengiriman dalam 1 bulan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie
                            data={shippingMethodChart}
                            labelLine={false}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={
                                            props.dominantBaseline
                                        }
                                        fill="hsla(var(--foreground))"
                                    >
                                        {payload.orders}
                                    </text>
                                );
                            }}
                            dataKey="orders"
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent nameKey="shipping_method" />
                            }
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default ShippingMethodChart;
