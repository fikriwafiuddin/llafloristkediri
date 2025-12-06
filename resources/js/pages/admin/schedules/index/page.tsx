import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import StatCard from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useDebounce from '@/hooks/useDebounce';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/schedules';
import { BreadcrumbItem, Order } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    CalendarDaysIcon,
    CircleAlertIcon,
    CircleCheckIcon,
    CircleXIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal',
        href: index().url,
    },
];

type ScheduleIndexPageProps = {
    schedules: {
        data: Order[];
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
        current_page: number;
    };
    statistics: {
        total: number;
        process: number;
        completed: number;
        cancelled: number;
    };
};

function ScheduleIndexPage({ schedules, statistics }: ScheduleIndexPageProps) {
    const initialDate = new Date().toString();

    const [date, setDate] = useState(initialDate);

    const debouncedDate = useDebounce(date, 500);

    const isInitialMount = useRef(true);

    const prevDate = useRef(initialDate);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const dateChange = debouncedDate !== prevDate.current;

        if (dateChange) {
            prevDate.current = String(debouncedDate);
            router.get(
                index().url,
                {
                    date: new Date(debouncedDate as string)
                        .toISOString()
                        .split('T')[0],
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [debouncedDate]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Jadwal</h2>
                </div>

                <DatePicker
                    value={new Date(date)}
                    onChange={(value) => setDate(value.toString())}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <StatCard
                        title="Jadwal"
                        value={statistics.total}
                        icon={CalendarDaysIcon}
                        isCurrency={false}
                    />
                    <StatCard
                        title="Proses"
                        value={statistics.process}
                        icon={CircleAlertIcon}
                    />
                    <StatCard
                        title="Selesai"
                        value={statistics.completed}
                        icon={CircleCheckIcon}
                    />
                    <StatCard
                        title="Dibatalkan"
                        value={statistics.cancelled}
                        icon={CircleXIcon}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>List Jadwal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTable columns={columns} data={schedules.data} />
                        <AppPagination
                            links={schedules.links}
                            current_page={schedules.current_page}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default ScheduleIndexPage;
