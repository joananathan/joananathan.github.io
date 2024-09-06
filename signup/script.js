right = document.querySelector('.right')
all = document.querySelector('*')
window.onload = function () {
  var input = document.getElementById('myTextInput');
  setTimeout(function() {
      input.focus();
  }, 250);
}
document.querySelector('.next').addEventListener('click', function() {
  all.style.opacity = '0.4'
  setTimeout(function() {
    all.style.opacity = '1'
    document.querySelector('.right').classList.add('slide-out');
    document.querySelector('.password').classList.add('slide-in');
    document.querySelector('.title').textContent = 'Welcome';
    document.querySelector('.subtitle').textContent = '';
    setTimeout(function() {
    right.style.padding = '7%'
  }, 500);
}, 500);
});