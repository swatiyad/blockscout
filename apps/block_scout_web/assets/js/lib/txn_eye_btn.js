document.addEventListener("DOMContentLoaded", function () {
    console.log('xxxxxxxxxxxxxx')
    const eyeBtns = document.querySelectorAll('.eyeBtn');
    eyeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            console.log('Button clicked!');
        });
    });
});