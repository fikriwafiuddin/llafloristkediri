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
import { destroy } from '@/routes/products';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

type DeleteProductProps = {
    id: number;
};

function DeleteProduct({ id }: DeleteProductProps) {
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
                        <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin untuk menghapus kategori ini?
                            Produk tidak dapat dikembalikan lagi
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

export default DeleteProduct;
