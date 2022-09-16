const filterBar = document.getElementById("filter");

filterBar.addEventListener("keyup", filterNames);

function filterNames(){
    let filterValue = document.getElementById("filter").value.toUpperCase();
    let cardContainter = document.querySelector(".cards");
    let cards = document.querySelectorAll(".card");
for (let card of cards) {
    const title = card.children[0].children[1].children[0].children[0].innerHTML;
    if (title.toUpperCase().indexOf(filterValue) > -1) {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }
}

}