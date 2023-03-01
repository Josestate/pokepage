let data;
const inpp = document.querySelector(".cardContainer");
function secapi(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
    .then(resu => resu.json())
    .then(resu =>{
        data = resu;
        console.log(resu)
        let divss = resu.results.map((post, i) =>{
            let id = i + 1
            return `<div class="cardChild" id="cardChild-${id}" data-url="${post.url}" onclick="modalShow(this)">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="" class="cardImg">
            <div class="cardFooter">
                <h1>Name: ${post.name}</h1>
            </div>
        </div>`
        })
        inpp.insertAdjacentHTML("beforeend", divss.join(" "));
    })
}
function modalShow(e){
    let dataUrl = e.attributes['data-url'].value;
    fetch(dataUrl)
    .then(res => res.json())
    .then(res =>{
        document.querySelector(".nameForm").textContent = res.name;
        document.querySelector(".idForm").textContent;
        document.querySelector(".pokeImg").setAttribute("src", res.sprites.front_default);
        let typesF = res.types.map((post)=>{
            return `<li class="cleaner" >${post.type.name}</li>`;
        });
        document.querySelector(".typesUl").insertAdjacentHTML("beforeend", typesF.join(" "));
        let abilities = res.abilities.map((post)=>{
            return `<li class="cleaner">${post.ability.name}</li>`;
        });
        document.querySelector(".abilitiesUl").insertAdjacentHTML("beforeend", abilities.join(" "));
        let moves = res.moves.map((post)=>{
            return `<li class="cleaner">${post.move.name}</li>`;
        });
        document.querySelector(".movesUl").insertAdjacentHTML("beforeend", moves.join(" "));
    })
    document.querySelector(".childModal").classList.remove('hide');
    document.querySelector(".overlay").classList.remove('hide');
}
document.querySelector(".overlay").addEventListener('click', e=>{
    document.querySelector(".childModal").classList.add('hide');
    document.querySelector(".overlay").classList.add('hide'); 
    document.querySelectorAll(".cleaner").forEach((post)=>{
        post.remove();
    })  
});
window.addEventListener("load", async function(){
    secapi();
});
function inpFn(e){
   let arr = data.results.filter(post => post.name.includes(e.value));
        document.querySelectorAll(".cardChild").forEach((post)=>{
            post.remove();
        });
        let armap = arr.map((post, i) =>{
            let id = post.url.split('/')[6];
            return `<div class="cardChild" id="cardChild-${id}" data-url="${post.url}" onclick="modalShow(this)">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="" class="cardImg">
            <div class="cardFooter">
                <h1>Name: ${post.name}</h1>
            </div>
        </div>`
        });
        inpp.insertAdjacentHTML("beforeend", armap.join(" "));
}