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
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
    { date: '2024-04-01', order: 222 },
    { date: '2024-04-02', order: 97 },
    { date: '2024-04-03', order: 167 },
    { date: '2024-04-04', order: 242 },
    { date: '2024-04-05', order: 373 },
    { date: '2024-04-06', order: 301 },
    { date: '2024-04-07', order: 245 },
];
const chartConfig = {
    order: {
        label: 'Pesanan',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

function OrderChart() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Grafik Pesanan</CardTitle>
                <CardDescription>
                    Grafik pesanan dalam 7 hari terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient
                                id="fillOrder"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-order)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-order)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('id-ID', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('id-ID', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="order"
                            type="natural"
                            fill="url(#fillOrder)"
                            stroke="var(--color-order)"
                            stackId="a"
                        />
                        {/* <ChartLegend content={<ChartLegendContent />} /> */}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default OrderChart;
