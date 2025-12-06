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

type LowestProductsProps = {
    lowestProducts: {
        product_id: number | null;
        name: string;
        total_orders: number;
        total_quantity: number;
        is_custom: boolean;
    }[];
};

function LowestProducts({ lowestProducts }: LowestProductsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Produk Terbawah</CardTitle>
                <CardDescription>
                    5 produk dengan penjualan terendah
                </CardDescription>
            </CardHeader>
            <CardContent>
                {lowestProducts.length == 0 ? (
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
                            {lowestProducts.map((product, index) => (
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

export default LowestProducts;
