var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var add = document.getElementById("btn-add");
var add2 = document.getElementById("btn-add2");
let submit = document.getElementById("submit");
let title = document.getElementById("title");
let form = document.getElementById("form");
let listadostorage = []
const selectionimg = document.getElementById('select');
let selectsolo = []
const ulGen = document.querySelector("#ListImage")
const ImgList = document.getElementById('ImgList');
const ListImage = document.querySelectorAll('.img');
const selectImg = document.getElementById('select-img');
let act_show = document.getElementById("act_show")
let acts = JSON.parse(localStorage.getItem('acts')) || []
let listado = document.querySelector("#listado")
let pending = document.getElementById("pending")

const getActs = () => {

    listado.innerHTML = ""
    


    //Para el fondo de colores según cuanto falta
    acts.forEach((act, index) => {
        let time_left = timeLeft();
        let time_days = Math.floor(time_left); // Días restantes, redondeado hacia abajo

        if (time_days >= 1 && time_days <= 2) { // De 2 a 1 día (inclusive)
            background = "red";
        } else if (time_days >= 3 && time_days <= 5) { // De 5 a 3 días (inclusive)
            background = "orange";
        } else if (time_days >= 6 && time_days <= 7) { // De 6 a 7 días (inclusive)
            background = "yellow";
        } else {
            background = "green"; 
        }



                    function timeLeft () {
                        let date_now = Date.now()
                        let act_time = act.timecreated
                        let a_day = (1000*60*60*24)
                        let notify = act.timecreated + a_day*act.time
                        let timeLeft = notify - date_now
                        let days = Math.round(timeLeft / (1000*60*60*24))
                        return days
                        }


                const template = `<li class="card ${background}" id="act-${index}">
                <span class="material-symbols-outlined closeicon" id="closeicon" onclick="deleteAct('${index}')">close</span>
                <img src="${act.imgsrc}"
                alt="${act.imgtxt}"></img>
                <h3>${act.title}</h3>
                <div><p>Hacer en ${time_left } días.</p></div>
            </li>`
                

        listado.innerHTML += template
    }
    )
}
// Me lleva de la pantalla inicial a la de agregar tarea

add.addEventListener('click', function() {
        first.style.display = "none";
        second.style.display = "block";
        }
)

// Despliega el menú de Seleccionar imagen
selectionimg.addEventListener('click', () => {
    ImgList.classList.toggle('d-none');
});

// Muestra la imagen seleccionada en el div
ListImage.forEach((img) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        const imgsrc = img.querySelector('img').src;
        const imgxt = img.querySelector('img').alt;

        selectImg.src = imgsrc;
        selectImg.alt = imgxt;
        selectImg.classList.remove('d-none');
        
        // Oculta el menú de selección de imágenes
        ImgList.classList.add('d-none');

       // Almacena la información de la imagen seleccionada en selectsolo
        selectsolo = [imgsrc, imgxt];
    });
});

// manejador de eventos para el botón "Add"
add.addEventListener('click', () => {
    // para obtener la información de la imagen seleccionada
    console.log(selectsolo);

});

//Capto los datos del form
form.addEventListener("submit", (e) => {
    e.preventDefault()
//Valido para que no avance si no hay tarea ingresada
    if (e.target.title.value == "") return alert ("Enter an activity")
    //guardo los datos
        const act = {
        title: e.target.title.value,
        time: e.target.selectdays.value,
        imgsrc: selectsolo [0],
        imgtxt: selectsolo [1],
        timecreated: Date.now(),
    }
    
    
    // guarda el array en local storage
    acts.push(act)
    localStorage.setItem("acts", JSON.stringify(acts))

    //reset del form
    selectsolo  = []
    selectImg .classList.add("d-none")
    form.reset()

    //cambia de pantalla
    second.style.display = "none";
    third.style.display = "block";
    
// Trae el contenido con la fecha restante
    
    getActs  ()
}
    )

    // Para que muestre la pantalla de la lista de tareas si tiene alguna cargada
    if(localStorage.getItem("acts")){
        third.style.display = "block";
        second.style.display = "none";
        first.style.display = "none";
        
        getActs  ()
    } 



// Botón para agregar más tareas desde la lista de tareas
add2.addEventListener('click', function(){
third.style.display = "none";
second.style.display = "block";
}
)

//Para eliminar
    const deleteAct = ((index) => {
        let seguro = confirm("This activity will be eliminate.")
        if (seguro === false) return
        acts.splice(index, 1)
        localStorage.setItem("acts", JSON.stringify(acts))
        getActs ()
        })

//Para que me lleve a la pantalla inicial si no tengo tareas

if (acts.length == 0) {
    third.style.display = "none";
    second.style.display = "none";
    first.style.display = "block";
} 


