import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, translateStatus } from '@/lib/utils';
import { stream } from '@/routes/orders/pdf';
import { index, show } from '@/routes/schedules';
import { BreadcrumbItem, Order, OrderItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    ArrowLeftIcon,
    CopyIcon,
    DownloadIcon,
    PuzzleIcon,
} from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    {
        title: 'Jadwal',
        href: index().url,
    },
    {
        title: 'Detail',
        href: show(id).url,
    },
];

type OrderShowPageProps = {
    schedule: Order & { order_items: OrderItem[] };
};

function OrderShowPage({ schedule }: OrderShowPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(schedule.id)}>
            <Head title="Detail Pesanan" />
            <div className="space-y-4 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-semibold">Kelola Jadwal</h2>
                    <Link href={index()}>
                        <Button>
                            <ArrowLeftIcon /> Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="space-y-2">
                            <CardTitle>Detail Pesanan</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const url =
                                        window.location.origin +
                                        stream(schedule.id).url;
                                    navigator.clipboard
                                        .writeText(url)
                                        .then(() =>
                                            toast.success(
                                                'Link berhasil disalin!',
                                            ),
                                        )
                                        .catch(() =>
                                            toast.error('Gagal menyalin link'),
                                        );
                                }}
                            >
                                <CopyIcon /> Salin link
                            </Button>
                            <a
                                href={stream(schedule.id).url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline">
                                    <DownloadIcon /> Unduh
                                </Button>
                            </a>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="mb-1 text-base font-semibold">
                                    Informasi Umum
                                </h3>
                                <div className="grid grid-cols-2 items-center gap-y-1">
                                    <p className="text-muted-foreground">
                                        ID Pesanan:
                                    </p>
                                    <p>{schedule.id}</p>
                                    <p className="text-muted-foreground">
                                        Status:
                                    </p>
                                    <p>{translateStatus(schedule.status)}</p>
                                    <p className="text-muted-foreground">
                                        Jadwal:
                                    </p>
                                    <p>
                                        {format(
                                            schedule.schedule,
                                            'dd MMMM yyyy HH:mm',
                                            {
                                                locale: id,
                                            },
                                        )}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Tanggal Dibuat:
                                    </p>
                                    <p>
                                        {format(
                                            schedule.created_at,
                                            'dd MMMM yyyy HH:mm',
                                            {
                                                locale: id,
                                            },
                                        )}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="mb-1 text-base font-semibold">
                                    Pelanggan
                                </h3>
                                <div className="grid grid-cols-2 gap-y-1">
                                    <p className="text-muted-foreground">
                                        Nama:
                                    </p>
                                    <p>{schedule.customer_name}</p>
                                    <p className="text-muted-foreground">
                                        Nomor Whatsapp:
                                    </p>
                                    <p>{schedule.whatsapp_number}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="mb-1 text-base font-semibold">
                                    Pengiriman
                                </h3>
                                <div className="grid grid-cols-2 gap-y-1">
                                    <p className="text-muted-foreground">
                                        Alamat:
                                    </p>
                                    <p>{schedule.address}</p>
                                    <p className="text-muted-foreground">
                                        Pengiriman:
                                    </p>
                                    <p>
                                        {schedule.shipping_method == 'delivery'
                                            ? 'Diantar'
                                            : 'Diambil'}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Catatan:
                                    </p>
                                    <p>{schedule.notes || '-'}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="mb-1 text-base font-semibold">
                                    Ringkasan Pembayaran
                                </h3>
                                <div className="grid grid-cols-2 items-center gap-y-1">
                                    <p className="text-muted-foreground">
                                        Total Pembayaran:
                                    </p>
                                    <p>
                                        {formatCurrency(schedule.total_amount)}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Status Pembayaran:
                                    </p>
                                    <p>
                                        {schedule.is_paid
                                            ? 'Lunas'
                                            : 'Belum Lunas'}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="mb-3 text-base font-semibold">
                                    Daftar Pesanan
                                </h3>
                                <div className="space-y-2">
                                    {schedule.order_items.map((item) => (
                                        <Item key={item.id} variant="outline">
                                            {item.is_custom ? (
                                                <>
                                                    <ItemMedia>
                                                        <div className="flex size-16 items-center justify-center rounded-sm bg-primary/30">
                                                            <PuzzleIcon className="text-muted" />
                                                        </div>
                                                    </ItemMedia>
                                                    <ItemContent>
                                                        <ItemTitle className="line-clamp-1">
                                                            {item.custom_name}{' '}
                                                            <Badge variant="outline">
                                                                Custom
                                                            </Badge>
                                                        </ItemTitle>
                                                        <div className="space-x-2 text-xs text-muted-foreground">
                                                            <span>
                                                                {item.quantity.toLocaleString()}
                                                            </span>
                                                            <span> x </span>
                                                            <span>
                                                                {formatCurrency(
                                                                    item.unit_price,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold">
                                                            {formatCurrency(
                                                                item.subtotal,
                                                            )}
                                                        </span>
                                                        <p>
                                                            {
                                                                item.custom_description
                                                            }
                                                        </p>
                                                    </ItemContent>
                                                </>
                                            ) : (
                                                <>
                                                    <ItemMedia>
                                                        <img
                                                            className="size-16 rounded-sm"
                                                            src={`/storage/${item.product?.image}`}
                                                            alt={
                                                                item.product
                                                                    ?.name
                                                            }
                                                        />
                                                    </ItemMedia>
                                                    <ItemContent>
                                                        <ItemTitle className="line-clamp-1">
                                                            {item.product?.name}
                                                        </ItemTitle>
                                                        <div className="space-x-2 text-xs text-muted-foreground">
                                                            <span>
                                                                {item.quantity.toLocaleString()}
                                                            </span>
                                                            <span> x </span>
                                                            <span>
                                                                {formatCurrency(
                                                                    item.unit_price,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold">
                                                            {formatCurrency(
                                                                item.subtotal,
                                                            )}
                                                        </span>
                                                    </ItemContent>
                                                </>
                                            )}
                                        </Item>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default OrderShowPage;
