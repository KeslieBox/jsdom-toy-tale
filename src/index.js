let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(results => {
    console.log(results)
    results.forEach(result => {
      addToyCard(result)
    })
  })

  

  function addToyCard(result) {
    const toyCollection = document.querySelector("#toy-collection")
    const div = document.createElement("div")
    div.className = "card"
    const h2 = document.createElement("h2")
    h2.innerText = result.name
    const img = document.createElement("img")
    img.src = result.image
    img.className = "toy-avatar"
    const p = document.createElement("p")
    p.innerText = result.likes + " likes"
    const button = document.createElement("button") 
    button.className = "like-btn"  
    toyCollection.appendChild(div) 
    div.innerHTML += h2.outerHTML + img.outerHTML + p.outerHTML + button.outerHTML
  }
