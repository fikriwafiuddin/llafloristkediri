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
import { Order } from '@/types';

type LatestOrder = {
    latestOrders: Order[];
};

function LatestOrder({ latestOrders }: LatestOrder) {
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
                                    {formatCurrency(order.total_amount)}
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
