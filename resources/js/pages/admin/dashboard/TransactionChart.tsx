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
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
    { day: 'Jumat', income: 186, expense: 80 },
    { day: 'Sabtu', income: 305, expense: 200 },
    { day: 'Minggu', income: 237, expense: 120 },
    { day: 'Senin', income: 73, expense: 190 },
    { day: 'Selasa', income: 209, expense: 130 },
    { day: 'Rabu', income: 214, expense: 140 },
    { day: 'Kamis', income: 214, expense: 140 },
];

const chartConfig = {
    income: {
        label: 'Pemasukan',
        color: 'var(--chart-2)',
    },
    expense: {
        label: 'Pengeluaran',
        color: 'var(--destructive)',
    },
} satisfies ChartConfig;

function TransactionChart() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Grafik Transaksi</CardTitle>
                <CardDescription>
                    Grafik transaksi selama 7 hari terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="income"
                            fill="var(--color-income)"
                            radius={4}
                        />
                        <Bar
                            dataKey="expense"
                            fill="var(--color-expense)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default TransactionChart;
