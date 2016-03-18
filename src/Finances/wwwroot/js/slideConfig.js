var slideout = new Slideout({
    'panel': document.getElementById('app-body'),
    'menu': document.getElementById('app-menu'),
    'padding': 256,
    'tolerance': 70
});

document.querySelector('#menu-btn').addEventListener('click', function () {
    slideout.toggle();
});