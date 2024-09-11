// Focus on the input field when the window loads
window.onload = function () {
  var input = document.getElementById('myTextInput');
  setTimeout(function() {
      input.focus();
  }, 250);
}

// Event listener for the "Enter" key press on input field
document.querySelector(".type").addEventListener("keyup", event => {
  if (event.key !== "Enter") return; // Use `.key` instead.
  document.querySelector(".next").click(); // Trigger click on "Next"
  event.preventDefault(); // Prevent default behavior
});

// Event listener for the "Next" button click
document.querySelector('.next').addEventListener('click', function() {
  // Show the loading bar
  document.querySelector('.animated-load').style.display = 'block';
  
  // Reduce opacity for a smooth transition
  document.querySelector('*').style.opacity = '0.4';
  
  setTimeout(function() {
      // Restore opacity after animation
      document.querySelector('*').style.opacity = '1';

      // Slide out the current section and slide in the next one
      document.querySelector('.right').classList.add('slide-out');
      document.querySelector('.password').classList.add('slide-in');
      
      // Update text content
      document.querySelector('.title').textContent = 'Welcome';
      document.querySelector('.subtitle').textContent = '';

      // Display entered email
      var email = document.getElementById('myTextInput').value;
      document.querySelector('.email-display').style.display = 'block';
      document.querySelector('.email-box').textContent = email;

      // Hide the loading bar after transition
      document.querySelector('.animated-load').style.display = 'none';
      setTimeout(function() {
        document.querySelector('.right').style.padding = '7%';
        document.querySelector('.frame').style.marginTop = '1%';
      }, 50);
  }, 1100); // Adjust the delay as per your requirement
});

// Toggle password visibility using checkbox
document.getElementById('showPassword').addEventListener('change', function() {
  var passwordInput = document.getElementById('passwordInput');
  if (this.checked) {
    passwordInput.type = 'text';
    document.querySelector('.pinputBox input').style.letterSpacing = '0.01rem';
    document.querySelector('.pinputBox input').style.fontSize = '0.95rem';
  } else {
    passwordInput.type = 'password';
  }
});
