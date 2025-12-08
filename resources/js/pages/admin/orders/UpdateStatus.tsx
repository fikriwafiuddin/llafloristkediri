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
import { router } from '@inertiajs/react';
import { useState } from 'react';

type UpdateStatusProps = {
    order: Order;
};

function UpdateStatus({ order }: UpdateStatusProps) {
    const [status, setStatus] = useState(order.status);
    const [processing, setProcessing] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        if (newStatus === status) return;
        setStatus(newStatus);

        setProcessing(true);

        router.post(
            updateStatus(order.id).url,
            {
                _method: 'PATCH',
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => setProcessing(false),
                onError: () => {
                    setProcessing(false);
                    setStatus(order.status);
                },
            },
        );
    };

    return (
        <Select
            disabled={processing}
            value={status}
            onValueChange={handleStatusChange}
        >
            <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {['process', 'completed', 'canceled'].map((status) => (
                        <SelectItem key={status} value={status}>
                            {translateStatus(status)}{' '}
                            {processing && status === status && (
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
