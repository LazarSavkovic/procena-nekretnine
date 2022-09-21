const filterBar = document.getElementById("apts-name-filter");
let cards = document.querySelectorAll(".card");

filterBar.addEventListener("keyup", filterApts);

rangeInput[0].addEventListener("change", filterApts);
rangeInput[1].addEventListener("change", filterApts);

function filterApts(){
    let filterValue = document.getElementById("apts-name-filter").value.toUpperCase();

for (let card of cards) {
    const title = card.children[0].children[1].children[0].children[0].innerHTML;
    const price = card.children[0].children[1].children[0].children[1].children[0].children[0].innerHTML;
    const minPrice = parseInt(rangeInput[0].value);
    const maxPrice = parseInt(rangeInput[1].value);
    if ((title.toUpperCase().indexOf(filterValue) > -1) && ((price >= minPrice) && (price <= maxPrice)))
     {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }
}
}
