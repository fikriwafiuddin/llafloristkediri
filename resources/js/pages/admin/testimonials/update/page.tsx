import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/testimonials';
import { BreadcrumbItem, Testimony } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import FormTestimony from '../FormTestimony';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    {
        title: 'Testimoni',
        href: index().url,
    },
    {
        title: 'Tambah',
        href: edit(id).url,
    },
];

type TestimonialsUpdatePageProps = {
    testimony: Testimony;
};

function TestimonialsUpdatePage({ testimony }: TestimonialsUpdatePageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(testimony.id)}>
            <Head title="Update Testimoni" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Testimoni</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Update Testmoni</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormTestimony testimony={testimony} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default TestimonialsUpdatePage;
