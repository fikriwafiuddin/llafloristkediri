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
    paid: {
        label: 'Lunas',
        color: 'var(--chart-5)',
    },
    unpaid: {
        label: 'Belum lunas',
        color: 'var(--chart-4)',
    },
} satisfies ChartConfig;

type PaymentStatusChartProps = {
    paymentStatusChart: {
        is_paid: string;
        orders: number;
        fill: string;
    }[];
};

function PaymentStatusChart({ paymentStatusChart }: PaymentStatusChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Grafik Status Pembayaran</CardTitle>
                <CardDescription>
                    Grafik perbandingan status pembayaran dalam 1 bulan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie
                            data={paymentStatusChart}
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
                            content={<ChartLegendContent nameKey="is_paid" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default PaymentStatusChart;
