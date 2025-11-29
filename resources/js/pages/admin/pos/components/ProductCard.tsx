import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import AddItemCart from './AddItemCart';

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="gap-2 p-2">
            <div className="p-1">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="mx-auto rounded-sm"
                />
            </div>
            <CardContent className="p-0">
                <CardTitle>
                    <h2 className="mb-2 line-clamp-1 text-sm font-semibold">
                        {product.name}
                    </h2>
                </CardTitle>
                <div className="">
                    <span>Rp {product.price.toLocaleString()}</span>
                </div>

                <AddItemCart product={product} />
            </CardContent>
        </Card>
    );
}

export default ProductCard;
