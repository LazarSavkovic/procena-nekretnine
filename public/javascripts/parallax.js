let oval1 = document.querySelector(".oval1");
let oval2 = document.querySelector(".oval2");
let oval3 = document.querySelector(".oval3");
let oval4 = document.querySelector(".oval4");

window.addEventListener("scroll", function(){
    let value = window.scrollY;
    oval1.style.top = 50 - (value * 0.3) + "px";
    oval2.style.top = 500  - (value * 0.3) + "px";
    oval3.style.top = 100 - (value * 0.1) + "px";
    oval4.style.top = 600  - (value * 0.1) + "px";
})