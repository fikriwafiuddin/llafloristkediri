import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

const latestOrders = [
    {
        id: 1,
        amount: 10000,
        customer_name: 'Joko',
    },
    {
        id: 1,
        amount: 10000,
        customer_name: 'Joko',
    },
    {
        id: 1,
        amount: 10000,
        customer_name: 'Joko',
    },
    {
        id: 1,
        amount: 10000,
        customer_name: 'Joko',
    },
    {
        id: 1,
        amount: 10000,
        customer_name: 'Joko',
    },
];

function LatestOrder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pesanan Terbaru</CardTitle>
                <CardDescription>5 pesanan terbaru</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Pemesan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {latestOrders.map((order, index) => (
                            <TableRow key={order.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {formatCurrency(order.amount)}
                                </TableCell>
                                <TableCell>{order.customer_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default LatestOrder;
