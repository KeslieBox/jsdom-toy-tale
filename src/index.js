let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", e => {
        postToy(e.target)
        e.preventDefault()
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToy()
});

function getToy(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(results => {
    results.forEach(toyObj => {
      loadToy(toyObj)
    })
  })
}

  function loadToy(toyObj) {
    const toyCollection = document.querySelector("#toy-collection")
    const div = document.createElement("div")
    div.className = "card"
    const h2 = document.createElement("h2")
    h2.innerText = toyObj.name
    const img = document.createElement("img")
    img.src = toyObj.image
    img.className = "toy-avatar"
    const p = document.createElement("p")
    p.innerText = `${toyObj.likes} likes`
    const btn = document.createElement("button") 
    btn.className = "like-btn"  
    btn.innerText = "Like <3"
    btn.id = toyObj.id
    // add event to increase likes with a click event, remember e.preventdefault
    btn.addEventListener("click", function(e) {
      likes(e)
      
    })

    toyCollection.appendChild(div) 
    div.append( h2, img, p, btn)
  }

  function likes(e) {
    e.preventDefault()
    // let increaseLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    let increaseLikes = parseInt(document.querySelector())
    
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      "likes": increaseLikes
    })
    })
    .then(resp => resp.json())
    .then(results => {
      e.target.previousElementSibling.innerText = `${increaseLikes} likes`
    })

  }
   
  function postToy(toyInfo){
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyInfo.name.value,
        "image": toyInfo.image.value,
        "likes": 0
      })
    })

    .then(resp => resp.json())
    .then(results => {
      loadToy(results)
    })
  }


