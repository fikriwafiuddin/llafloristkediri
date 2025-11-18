import { AlertTitle } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroy } from '@/routes/categories';
import { useForm } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { FormEvent, useState } from 'react';

type DeleteCategoryProps = {
    id: number;
};

function DeleteCategory({ id }: DeleteCategoryProps) {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const { submit, processing } = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(destroy(id));
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setOpenConfirm(true)}>
                <Trash2Icon />
            </Button>
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertTitle>Hapus Kategori</AlertTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin untuk menghapus kategori ini?
                            Kategori tidak dapat dikembalikan lagi dan menghapus
                            semua produk yang berelasi
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <form onSubmit={handleSubmit}>
                            <Button
                                variant="destructive"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? <Spinner /> : 'Hapus'}
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteCategory;
