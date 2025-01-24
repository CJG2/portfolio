document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('#hamburger');
    const navLinks = document.querySelector('#navigation');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
