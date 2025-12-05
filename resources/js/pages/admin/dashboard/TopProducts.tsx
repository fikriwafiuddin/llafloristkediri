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
import { TopProduct } from './types';

type TopProductsProps = {
    topProducts: TopProduct[];
};

function TopProducts({ topProducts }: TopProductsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Produk</CardTitle>
                <CardDescription>
                    5 produk dengan penjualan tertinggi dalam 7 hari terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Pesanan</TableHead>
                            <TableHead>Kuantitas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topProducts.map((product, index) => (
                            <TableRow key={product.name}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {product.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {product.total_orders.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {product.total_quantity.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TopProducts;
