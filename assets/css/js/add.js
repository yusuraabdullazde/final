const first = document.querySelector(".first")
const last = document.querySelector(".last")
const price = document.querySelector(".price")
const table = document.querySelector("table")
const image = document.querySelector(".image")
const photo = document.querySelector(".photo")
const add = document.querySelector("#submit")

fetch("http://localhost:3000/api")
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            table.innerHTML += `
        <tr>
        <td>${element.id}</td>
        <th>${element.first_name}</td>
        <td>${element.last_name}</td>
        <td>${element.price}</td>
        <td>
           <button onclick="deletefunks${element.id})">Delete</button>
        </td>
    </tr>`
        });
    })

function deletefunks(id) {
    axios.delete(`http://localhost:3000/api/${id}`)
    window.location.reload()
}


photo.addEventListener("input", (e) => {
    let file = e.target.files[0]
    if (file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            image.src = reader.result
        }
    }
})


add.addEventListener("click", function () {
    let obj = {
        first_name: first.value,
        last_name: last.value,
        price: price.value,
        image: image.src
    }
    axios.post("http://localhost:3000/api", obj)
        .then(res => window.location = "./index.html")
})

