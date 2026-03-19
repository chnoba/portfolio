(function() {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Si (eligió dark) O (no eligió nada Y el sistema es dark), ponemos .dark
    const isDark = saved === 'dark' || (!saved && systemDark);

    document.documentElement.classList.toggle('dark', isDark);
})();