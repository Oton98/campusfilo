const iconoMenu= document.querySelector('#hamburger-menu');
menu = document.querySelector('#menu');

iconoMenu.addEventListener('click', (e) =>{
    menu.classList.toggle('active');
    document.body.classList.toggle ('opacity');
});