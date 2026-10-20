/* Abertura com o logo: só na primeira página de cada visita, nunca para robôs nem com "reduzir movimento".
   Carregado no <head> sem defer (é minúsculo) para marcar o <html> antes da primeira pintura. */
(function (d) {
  try {
    if (sessionStorage.getItem('cf-intro')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (/bot|crawl|spider|slurp|preview/i.test(navigator.userAgent)) return;
    sessionStorage.setItem('cf-intro', '1');
    d.documentElement.classList.add('intro');
  } catch (e) { /* sem sessionStorage: segue sem abertura */ }
})(document);
