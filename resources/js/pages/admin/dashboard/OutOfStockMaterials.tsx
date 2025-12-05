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
import { Material } from '@/types';

type OutOfStockMaterials = {
    materials: Material[];
};

function OutOfStockMaterials({ materials }: OutOfStockMaterials) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bahan Stok Habis</CardTitle>
                <CardDescription>Bahan yang stoknya habis</CardDescription>
            </CardHeader>
            <CardContent>
                {materials.length == 0 ? (
                    <h2 className="text-center text-2xl text-muted">
                        Stok bahan aman
                    </h2>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Stok</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.map((material) => (
                                <TableRow key={material.id}>
                                    <TableCell>{material.id}</TableCell>
                                    <TableCell>{material.name}</TableCell>
                                    <TableCell>{material.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export default OutOfStockMaterials;
