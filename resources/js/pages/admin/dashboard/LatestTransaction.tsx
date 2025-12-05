import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CashTransaction } from '@/types';
import { TrendingDown, TrendingUpIcon } from 'lucide-react';

type LatestTransactionProps = {
    latesTransactions: CashTransaction[];
};

function LatestTransaction({ latesTransactions }: LatestTransactionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>5 transaksi terbaru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {latesTransactions.map((transaction, index) => (
                    <div
                        key={transaction.id}
                        className="border-b border-muted py-1"
                    >
                        <div className="flex justify-between">
                            <div className="flex gap-2 text-muted-foreground">
                                <span>{index + 1}.</span>
                                <span className="font-semibold">
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </div>
                            <div className="">
                                {transaction.type == 'expense' ? (
                                    <TrendingDown className="size-4 text-destructive" />
                                ) : (
                                    <TrendingUpIcon className="size-4 text-success" />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <span className="text-xs text-muted-foreground">
                                {formatDate(transaction.transaction_date)}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default LatestTransaction;
