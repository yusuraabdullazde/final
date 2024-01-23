(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const first = document.querySelector(".first")
const last = document.querySelector(".last")
const price = document.querySelector(".price")
const table = document.querySelector("table")
const add = document.querySelector("#submit")
const form = document.querySelector("#form")
const password = document.querySelector(".password")

add.addEventListener("click", function () {
  let obj = {
    first_name: first.value,
    last_name: last.value,
    price: price.value,
    password: password.value
  }
  axios.post("http://localhost:3000/form", obj)
    .then(res => window.location = "./index.html")
})


