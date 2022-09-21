const filterBar = document.getElementById("flats-name-filter");
let cards = document.querySelectorAll(".card");

filterBar.addEventListener("keyup", filterApts);

function filterApts(){
    let filterValue = document.getElementById("flats-name-filter").value.toUpperCase();

for (let card of cards) {
    const title = card.children[0].children[1].children[0].children[0].innerHTML;
    if (title.toUpperCase().indexOf(filterValue) > -1)
     {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }
}
}
