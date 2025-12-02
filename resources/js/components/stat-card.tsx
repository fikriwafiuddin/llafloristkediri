import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: number;
    icon: LucideIcon;
    isCurrency?: boolean;
};

function StatCard({
    title,
    value,
    icon: IconComponent,
    isCurrency = false,
}: StatCardProps) {
    return (
        <Card className="transition-transform hover:translate-y-[-2px]">
            <CardContent>
                <div>
                    <div>
                        <div className="flex w-full items-start justify-between">
                            <h3 className="text-sm font-medium">{title}</h3>
                            <div>
                                <IconComponent />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline">
                            <p className="max-w-[180px] truncate text-[clamp(1rem,2vw,1.5rem)] font-semibold break-words">
                                {isCurrency
                                    ? formatCurrency(value)
                                    : value.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default StatCard;
