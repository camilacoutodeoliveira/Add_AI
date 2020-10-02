self.addEventListener('install', function (event) {
    console.log('SW: instalado!', event);
})

self.addEventListener('activate', function (event) {
    console.log('SW: instalado!', event);
})

this.addEventListener('fetch', function (event) {
    // it can be empty if you just want to get rid of that error
});