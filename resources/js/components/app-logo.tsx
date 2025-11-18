export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white">
                <img src="/logo.png" alt="" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate font-playfair-display leading-tight font-semibold text-primary">
                    LLA Florist Kediri
                </span>
            </div>
        </>
    );
}
