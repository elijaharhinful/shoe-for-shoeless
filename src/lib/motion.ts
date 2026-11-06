/**
 * Inline <head> script that drives the scroll motion in globals.css. It runs before first paint
 * and does not wait for React, so animations work even while the JS bundle is still loading.
 *
 * - Sets html[data-motion] only when the visitor allows motion (else nothing is ever hidden).
 * - Adds [data-inview] to .reveal / .reveal-media elements as they scroll into view.
 * - Watches the DOM so sections rendered by client-side navigation are picked up too.
 */
export const motionBootScript = `(function(){
var d=document.documentElement,w=window;
if(!w.matchMedia||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in w)||!('MutationObserver' in w))return;
d.setAttribute('data-motion','');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-inview','');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
var queued=false;
function scan(){queued=false;document.querySelectorAll('.reveal:not([data-inview]),.reveal-media:not([data-inview])').forEach(function(el){if(!el.__sfsObserved){el.__sfsObserved=1;io.observe(el)}})}
function start(){scan();new MutationObserver(function(){if(!queued){queued=true;requestAnimationFrame(scan)}}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();`;
