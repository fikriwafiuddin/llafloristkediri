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

type TopProductsProps = {
    topProducts: {
        product_id: number | null;
        name: string;
        total_orders: number;
        total_quantity: number;
        is_custom: boolean;
    }[];
};

function TopProducts({ topProducts }: TopProductsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Produk</CardTitle>
                <CardDescription>
                    5 produk dengan penjualan tertinggi
                </CardDescription>
            </CardHeader>
            <CardContent>
                {topProducts.length == 0 ? (
                    <h2 className="text-center text-2xl text-muted">
                        Data kosong
                    </h2>
                ) : (
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
                )}
            </CardContent>
        </Card>
    );
}

export default TopProducts;
