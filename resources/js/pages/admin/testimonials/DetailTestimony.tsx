import RatingStarts from '@/components/rating-starts';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { Testimony } from '@/types';
import { EyeIcon } from 'lucide-react';

type DetailTestimonyProps = {
    testimony: Testimony;
};

function DetailTestimony({ testimony }: DetailTestimonyProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <EyeIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Testimoni</DialogTitle>
                    <DialogDescription>
                        Detail lengkap ulasan pelanggan
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold">Nama Pelanggan:</p>
                        <p>{testimony.customer_name}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Status Pelanggan:</p>
                        <p>{testimony.customer_status}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Rating:</p>
                        <RatingStarts rating={testimony.rating} />
                    </div>

                    <div>
                        <p className="font-semibold">Dibuat:</p>
                        <p>{formatDate(testimony.created_at)}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Ulasan:</p>
                        <p>{testimony.review}</p>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DetailTestimony;
