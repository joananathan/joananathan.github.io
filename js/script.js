const mobileMenu = document.querySelector(".header__menu-mobile");
window.addEventListener('scroll', function(){
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY >= 10);
})



const toggleMobileMenu = () => {
    const menuSection = document.querySelector('.header__menu');
    menuSection.classList.toggle('show-menu');
}
mobileMenu.addEventListener('click', toggleMobileMenu);
