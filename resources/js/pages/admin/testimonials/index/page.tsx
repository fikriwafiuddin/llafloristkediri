import AppPagination from '@/components/app-pagination';
import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/testimonials';
import { BreadcrumbItem, Testimony } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import columns from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Testimoni',
        href: index().url,
    },
];

type TestimonialsIndexPageProps = {
    testimonials: {
        data: Testimony[];
        current_page: number;
        links: {
            url: string;
            page: number;
            active: boolean;
        }[];
    };
};

function TestimonialsIndexPage({ testimonials }: TestimonialsIndexPageProps) {
    const { flash } = usePage<{ flash: { success: string } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimoni" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Testimoni</h2>
                    <Link href={create()}>
                        <Button>+ Tambah Testimoni</Button>
                    </Link>
                </div>

                {flash.success && (
                    <Alert>
                        <CheckCircleIcon />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>List Testimoni</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTable columns={columns} data={testimonials.data} />

                        <AppPagination
                            links={testimonials.links}
                            current_page={testimonials.current_page}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default TestimonialsIndexPage;
