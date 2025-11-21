import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Pastikan path ini benar sesuai konfigurasi shadcn Anda
import { Upload } from 'lucide-react'; // Menggunakan ikon dari lucide-react
import React, {
    ChangeEvent,
    DragEvent,
    useCallback,
    useRef,
    useState,
} from 'react';

// --- 1. Tipe Data (Interface) ---
interface FileUploadProps extends React.ComponentProps<'input'> {
    /** Fungsi yang dipanggil ketika file berhasil dipilih atau di-drop. */
    onFileSelect: (file: File) => void;
    /** Batasan tipe file yang diterima (contoh: "image/png, image/jpeg") */
    acceptedFileTypes?: string;
    /** Teks panduan untuk batasan file (contoh: "Max 120 MB, PNG, JPEG, MP4") */
    fileRestrictionsText?: string;
    previewUrl?: string | null;
}

const DEFAULT_MIME_TYPES = 'image/png, image/jpeg, audio/mp3, video/mp4';
const DEFAULT_RESTRICTIONS_TEXT = 'Max 120 MB, PNG, JPEG, MP3, MP4';

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    acceptedFileTypes = DEFAULT_MIME_TYPES,
    fileRestrictionsText = DEFAULT_RESTRICTIONS_TEXT,
    previewUrl,
    ...props
}) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- 2. Fungsi Penanganan File ---

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (files && files.length > 0) {
                // Hanya ambil file pertama (asumsi single upload)
                onFileSelect(files[0]);
            }
        },
        [onFileSelect],
    );

    // Handle ketika file dijatuhkan
    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles],
    );

    // Handle ketika file ditarik ke area
    const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    // Handle ketika file dipilih dari tombol "Browse File"
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            handleFiles(e.target.files);
        },
        [handleFiles],
    );

    // Membuka dialog pemilihan file
    const onButtonClick = () => {
        inputRef.current?.click();
    };

    // --- 3. Tampilan dengan Shadcn & Tailwind ---

    // Kelas dinamis untuk border saat drag aktif
    const borderClass = dragActive
        ? 'border-primary bg-primary/5' // Menggunakan warna primary shadcn
        : 'border-input bg-background hover:border-muted-foreground/50'; // Warna standar shadcn

    return (
        <div
            // Container utama
            className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors duration-200 ${borderClass}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick} // Memungkinkan klik pada area kosong untuk membuka file dialog
        >
            {/* Input File Tersembunyi */}
            <Input
                ref={inputRef}
                type="file"
                {...props}
                onChange={handleChange}
                accept={acceptedFileTypes}
                className="hidden"
            />

            {/* Overlay Drag Aktif */}
            {dragActive && (
                <div
                    className="absolute top-0 left-0 z-10 h-full w-full"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                />
            )}

            {/* Konten Upload */}
            <div className="z-20 flex flex-col items-center space-y-3">
                {/* --- PRATINJAU GAMBAR --- */}
                {previewUrl ? (
                    <div className="relative size-48 overflow-hidden rounded-lg border border-gray-200">
                        <img
                            src={previewUrl}
                            alt="Pratinjau Gambar"
                            className="h-full w-full object-cover"
                        />
                        {/* Opsi: Tombol hapus pratinjau jika diperlukan */}
                    </div>
                ) : (
                    // Ikon default jika tidak ada pratinjau
                    <Upload className="h-8 w-8 text-muted-foreground" />
                )}

                <p className="text-sm text-muted-foreground">
                    {fileRestrictionsText}
                </p>

                {/* Menggunakan komponen Button shadcn */}
                <Button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); // Mencegah klik tombol memicu klik pada div utama dua kali
                        onButtonClick();
                    }}
                >
                    Browse File
                </Button>
            </div>
        </div>
    );
};

// export default FileUpload;
