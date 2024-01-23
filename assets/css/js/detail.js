let id=new URLSearchParams(window.location.search).get("id")
const card=document.querySelector(".card-element")
function details(id){
    fetch(`http://localhost:3000/api/${id}`)
    .then(res=>res.json())
    .then(element=>{
        card.innerHTML+=`
        <div class="item">
        <div class="sekil">
            <img src="${element.image}" alt="">
        </div>
        <p>${element.first_name}</p>
        <span>${element.last_name}</span>
        <p>${element.price}</p>
        <button onclick="history.back()">Close</button>

    </div>`
    })
}

details(id)