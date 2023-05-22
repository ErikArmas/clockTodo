//Watch
const WATCH = document.getElementById('watch');
const DATE = document.getElementById('date');
//MODAL TODO LIST
const listIcon = document.querySelector('.list-icon button');
const containerTodo = document.getElementById('container-todo')

//MODAL ADD TODO
const btnSave = document.getElementById('btnSave');
const inputAddModal = document.querySelectorAll('#addTodoModal input')

//todo list
let todo = [];

function getTime(container){
    let time = new Date();
    let hour = time.getHours();
    let minut = time.getMinutes();
    let second = time.getSeconds();

    hour = hour < 10? '0' + hour : hour;
    minut = minut < 10? '0' + minut : minut;
    second = second < 10? '0' + second : second;

    container.innerHTML = `${hour} : ${minut} : ${second}` ;
}   

function getDate(container){
    const MONTHS = ['Enero','Febrero','Marzo','Abril',
    'Mayo','Junio','Julio','Agosto','Septiembre',
    'Octubre','Noviembre','Diciembre'];

    const DAYS = ['Domingo','Lunes','Martes','Miercoles',
    'Jueves','Viernes'];
    let week = new Date();

    date = week.getDate();
    month = week.getMonth();
    year = week.getFullYear();
    day = week.getDay();
    
    container.innerHTML = `
        ${DAYS[day]} <br>
        ${date} de ${MONTHS[month]} del ${year}`;
}

function handledDeletedClick(id){
    swal.fire({
        icon:'warning',
        title:'¿Desea eliminar la tarea?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    })
    .then((response)=>{
        if(response.isConfirmed){
            
            let tempTODO = [...todo];
            tempTODO.splice(id,1);
            todo = [...tempTODO];
            drawItemTodo(todo);

            swal.fire({title: 'Eliminado!',icon: 'success'})
            
        }
    });
}

function drawItemTodo(todos){
    let temp = '';
    keys = todos.keys();
    tempKeys = [];
    // getKeys items
    for (const key of keys) {
        tempKeys.push(key); 
    }

    //iteration keys
    i = 0;
    todos.forEach(todo => {
        if(todo.status){
            temp += `
                <div class="item-todo">
                    <div class="description"> ${todo.description}</div>
                    <div class="actions">
                        <button class="btn btn-danger" onclick="handledDeletedClick(${tempKeys[i]})">Eliminar</button>
                    </div>
                </div>`
        }
        i++;
    });

    containerTodo.innerHTML = temp;
}

function handledKeyDown(event){
    cod = event.which || event.keyCode;
    if(cod === 13) btnSave.click();
}

listIcon.addEventListener('click',(e)=>{
    e.preventDefault();
    $('#todoModal').modal('show');

    containerTodo.innerHTML = '';

    drawItemTodo(todo);
});

btnSave.addEventListener('click',()=>{
    if(inputAddModal[0].value.trim() == '') return false;
    description = inputAddModal[0].value;
    todo.push({description,status:true});

    inputAddModal[0].value = '';
    drawItemTodo(todo);
})

setInterval(() => {
    getDate(DATE);
    getTime(WATCH);
}, 1000);

