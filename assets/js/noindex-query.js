(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.has('s') || params.has('orden') || params.has('filter')) {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
  }
})();
