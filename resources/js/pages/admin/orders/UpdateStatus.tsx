import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { translateStatus } from '@/lib/utils';
import { updateStatus } from '@/routes/orders';
import { Order } from '@/types';
import { useForm } from '@inertiajs/react';

type UpdateStatusProps = {
    order: Order;
};

function UpdateStatus({ order }: UpdateStatusProps) {
    const { data, setData, processing, patch } = useForm({
        status: order.status,
    });

    const handleCangeStatus = (value: string) => {
        setData('status', value);
        patch(updateStatus(order.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <Select
            disabled={processing}
            value={data.status}
            onValueChange={handleCangeStatus}
        >
            <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {['process', 'completed', 'canceled'].map((status) => (
                        <SelectItem key={status} value={status}>
                            {translateStatus(status)}{' '}
                            {processing && data.status === status && (
                                <Spinner className="ml-2 h-4 w-4" />
                            )}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default UpdateStatus;
