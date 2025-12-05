import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroy } from '@/routes/testimonials';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

type DeleteTestimonyProps = {
    id: number;
};

function DeleteTestimony({ id }: DeleteTestimonyProps) {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const { submit, processing } = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submit(destroy(id));
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setOpenConfirm(true)}>
                <TrashIcon />
            </Button>

            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Testimoni</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin untuk menghapus testimoni ini?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <form onSubmit={handleSubmit}>
                                <Button
                                    className="w-full"
                                    variant="destructive"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? <Spinner /> : 'Hapus'}
                                </Button>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteTestimony;
