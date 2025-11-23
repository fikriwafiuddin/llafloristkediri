<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <title>@yield('title') llafloristkediri</title>
</head>
<body>
    <x-navbar/>

    @yield('content')

    <x-footer/>

    <script>
        const mobileSidebar = document.getElementById('mobileSidebar');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        const sidebarContent = document.getElementById('sidebarContent');
        const openSidebar = document.getElementById('openSidebar');
        const closeSidebar = document.getElementById('closeSidebar');

        function openSidebarMenu() {
            // Enable pointer events
            mobileSidebar.classList.remove('pointer-events-none');
            sidebarBackdrop.classList.remove('pointer-events-none');
            
            // Trigger animations
            requestAnimationFrame(() => {
                sidebarBackdrop.classList.remove('opacity-0');
                sidebarBackdrop.classList.add('opacity-100');
                sidebarContent.classList.remove('translate-x-full');
                sidebarContent.classList.add('translate-x-0');
            });
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        function closeSidebarMenu() {
            // Trigger close animations
            sidebarBackdrop.classList.remove('opacity-100');
            sidebarBackdrop.classList.add('opacity-0');
            sidebarContent.classList.remove('translate-x-0');
            sidebarContent.classList.add('translate-x-full');
            
            // Disable pointer events after animation
            setTimeout(() => {
                mobileSidebar.classList.add('pointer-events-none');
                sidebarBackdrop.classList.add('pointer-events-none');
            }, 300);
            
            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Event listeners
        openSidebar.addEventListener('click', openSidebarMenu);
        closeSidebar.addEventListener('click', closeSidebarMenu);
        sidebarBackdrop.addEventListener('click', closeSidebarMenu);
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebarMenu();
            }
        });
    </script>
</body>
</html>