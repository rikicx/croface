/* Abertura com o logo: em toda carga da home; nas outras páginas, só se for a primeira página da visita.
   Nunca para robôs nem com "reduzir movimento".
   Carregado no <head> sem defer (é minúsculo) para marcar o <html> antes da primeira pintura. */
(function (d) {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (/bot|crawl|spider|slurp|preview/i.test(navigator.userAgent)) return;
    var home = location.pathname === '/' || location.pathname === '/index.html';
    if (!home && sessionStorage.getItem('cf-intro')) return;
    sessionStorage.setItem('cf-intro', '1');
    d.documentElement.classList.add('intro');
  } catch (e) { /* sem sessionStorage: segue sem abertura */ }
})(document);
