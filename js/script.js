const mobileMenu = document.querySelector(".header__menu-mobile");
const menu = document.querySelector(".header__menu")
window.addEventListener('scroll', function(){
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY >= 10);
})



const toggleMobileMenu = () => {
    const menuSection = document.querySelector('.header__menu');
    menuSection.classList.toggle('show-menu');
}
mobileMenu.addEventListener('click', toggleMobileMenu);
menu.addEventListener('click', toggleMobileMenu);
