import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/reports';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ArrowRightIcon,
    BookOpenIcon,
    FlowerIcon,
    NotebookIcon,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: index().url,
    },
];

function ReportIndexPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan" />
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-semibold">Laporan</h2>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Laporan Produk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center py-1 text-muted">
                                <FlowerIcon className="size-16" />
                            </div>
                            <CardFooter>
                                <Button size="sm" className="w-full">
                                    Lihat detail <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Laporan Pesanan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center py-1 text-muted">
                                <BookOpenIcon className="size-16" />
                            </div>
                            <CardFooter>
                                <Button size="sm" className="w-full">
                                    Lihat detail <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Laporan Kas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center py-1 text-muted">
                                <NotebookIcon className="size-16" />
                            </div>
                            <CardFooter>
                                <Button size="sm" className="w-full">
                                    Lihat detail <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

export default ReportIndexPage;
