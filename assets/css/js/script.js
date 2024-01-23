const list = document.querySelector(".list")
const menu = document.querySelector("#menu")
const close = document.querySelector(".close")
let info = [];
menu.addEventListener("click", () => {
    list.style.transform = "translateX(100%)"
    list.classList.add("active")
    close.addEventListener("click", () => {
        list.style.transform = "translateX(0%)"
        list.classList.remove("active")
    })
})

const count = document.querySelector(".count")
const card = document.querySelector(".card-element")
function myData() {
    fetch("http://localhost:3000/api")
        .then(res => res.json())
        .then(data => {
            fetch("http://localhost:3000/fav")
                .then(res => res.json())
                .then(datafav => {
                    count.innerHTML = `${datafav.length}`
                    data.forEach(element => {
                        if (data.find(f => f.id == element.id)) {
                            card.innerHTML += `
                    <div class="item">
                     <div class="sekil">
                         <img src="${element.image}" alt="">
                     </div>
                     <i class="bi bi-heart-fill bi${element.id}" onclick=addFav(${element.id})></i>
                     <p>${element.first_name}</p>
                     <span>${element.last_name}</span>
                     <p>${element.price}</p>
                     <a href="./detail.html?id=${element.id}">Detail</a>
                 <button onclick="deletefunk(${element.id})">Delete</button>
                 </div>`
                        }
                        else {
                            card.innerHTML += `
                    <div class="item">
                     <div class="sekil">
                         <img src="${element.image}" alt="">
                     </div>
                     <i class="bi bi-heart bi${element.id}" onclick=addFav(${element.id})></i>
                     <p>${element.first_name}</p>
                     <span>${element.last_name}</span>
                     <p>${element.price}</p>
                     <a href="./detail.html?id=${element.id}">Detail</a>
                 <button onclick="deletefunk(${element.id})">Delete</button>
                 </div>`
                        }
                    });
                })
        })
}



function deletefunk(id) {
    axios.delete(`http://localhost:3000/api/${id}`)
    window.location.reload()
}



function addFav(id) {
    const bi = document.querySelector(`bi${id}`)
    axios.get(`http://localhost:3000/api/${id}`)
        .then(res => {
            return res.data
        })
        .then(res => {
            axios.get("http://localhost:3000/fav")
                .then(post => {
                    let like = post.data.find(f => f.id == res.id)
                    if (!like) {
                        count.innerText = `${Number(count.length) + 1}`
                        axios.post("http://localhost:3000/fav", res)
                        bi.classList.add("bi-heart-fill")
                        bi.classList.remove("bi-heart")
                    } else {
                        count.innerText = `${Number(count.length) - 1}`
                        axios.delete(`http://localhost:3000/fav/${id}`)
                        bi.classList.remove("bi-heart-fill")
                        bi.classList.add("bi-heart")
                    }
                })

        })
}

const secmek = document.querySelector("#select");
console.log(secmek);
const writenames = (arr) => {
    card.innerHTML = ''
    arr.forEach(element => {
        card.innerHTML += ` <div class="item">
        <div class="sekil">
            <img src="${element.image}" alt="">
        </div>
        <i class="bi bi-heart-fill bi${element.id}" onclick=addFav(${element.id})></i>
        <p>${element.first_name}</p>
        <span>${element.last_name}</span>
        <p>${element.price}</p>
        <a href="./detail.html?id=${element.id}">Detail</a>
    <button onclick="deletefunk(${element.id})">Delete</button>
    </div>`
    })
}

fetch("http://localhost:3000/api/")
    .then(r => r.json())
    .then(data => {
        info = data;

        writenames(info)
    })

secmek.addEventListener("change", (e) => {
    console.log(e.target.value);
    console.log(info);
    let infoClone = [...info]
    if (e.target.value = "az") {
        let sortAz = infoClone.sort((a, b) => a.first_name.localeCompare(b.first_name))
        console.log(sortAz);
        writenames(sortAz)
    }
    else if (e.target.value = "za") {
        let sortZa = infoClone.sort((a, b) => b.first_name.localeCompare(a.first_name))
        writenames(sortZa)
    }
    else {
        writenames(info)
    }
})

const search = document.querySelector("#search")
search.addEventListener("input", () => {
    card.innerHTML = ''
    fetch("http://localhost:3000/api")
        .then(res => res.json())
        .then(data => {
            fetch("http://localhost:3000/fav")
                .then(res => res.json())
                .then(datafav => {
                    count.innerHTML = `${datafav.length}`
                    data.forEach(element => {
                        if (element.first_name.toLowerCase().includes(first_name.toLowerCase())) {
                            if (data.find(f => f.id == element.id)) {
                                card.innerHTML += `
                    <div class="item">
                     <div class="sekil">
                         <img src="${element.image}" alt="">
                     </div>
                     <i class="bi bi-heart-fill bi${element.id}" onclick=addFav(${element.id})></i>
                     <p>${element.first_name}</p>
                     <span>${element.last_name}</span>
                     <p>${element.price}</p>
                     <a href="./detail.html?id=${element.id}">Detail</a>
                 <button onclick="deletefunk(${element.id})">Delete</button>
                 </div>`
                            }
                            else {
                                card.innerHTML += `
                    <div class="item">
                     <div class="sekil">
                         <img src="${element.image}" alt="">
                     </div>
                     <i class="bi bi-heart bi${element.id}" onclick=addFav(${element.id})></i>
                     <p>${element.first_name}</p>
                     <span>${element.last_name}</span>
                     <p>${element.price}</p>
                     <a href="./detail.html?id=${element.id}">Detail</a>
                 <button onclick="deletefunk(${element.id})">Delete</button>
                 </div>`
                            }
                        }
                    });
                })
        })
})
