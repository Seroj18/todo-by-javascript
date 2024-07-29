const newItem = document.querySelector(".newItem")
const add = document.querySelector(".todo_add")
const tasks = document.querySelector(".todo_list")

const tasksArr = []

add.onclick = () => {
    const newTaskText = newItem.value
    if (newTaskText && isNotHaveTask(newTaskText, tasksArr) && add.innerHTML !== 'Change') {
        addTask(newTaskText,tasksArr)
        newItem.value = ''
        tasksRender(tasksArr)
    }
} 

function addTask(text,list){
    list.push({
        id:Date.now(),
        text:text,
        isComplete:false
    })
}

function isNotHaveTask(text, list){
    let isNotHave = true

    list.forEach(task => {
        if (task.text === text) {
            alert('նման առաջադրանք արդեն կա !')
            isNotHave = false
        }
    });

    return isNotHave
}

 function tasksRender(list){
    let htmlList = ''

    list.forEach(task =>{
        const cls = task.isComplete 
        ? 'todo_task todo_task_complete' 
        : 'todo_task'
        const chacked = task.isComplete 
        ? 'checked'
        : ''

        const taskHtml = `
        <div id='${task.id}' class="${cls}">
        <label class="todo_checkbox">
            <input type="checkbox" ${chacked}>
            <div class="todo_checkbox-div"></div>
        </label>
        <div class="todo_task-text">${task.text}</div>
        <div class="todo_Edit">Edit</div>
        <div class="todo_task-del">-</div>
        </div>`

        htmlList = htmlList + taskHtml
    })

    tasks.innerHTML = htmlList
}

tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo_checkbox-div')
    const isDeleteEl = target.classList.contains('todo_task-del')
    const isEditEl = target.classList.contains('todo_Edit')

    if (isCheckboxEl) { 
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId,tasksArr)
        tasksRender(tasksArr)
    }

    if (isEditEl) { 
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        EditTask(taskId,tasksArr)
        tasksRender(tasksArr)
    }

    if(isDeleteEl){
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId,tasksArr)
        tasksRender(tasksArr)
    }
}

function changeTaskStatus(id,list){
    list.forEach(task =>{
        if(task.id == id){
            task.isComplete =  !task.isComplete
        }
    })
}

function EditTask(id,list){
    list.forEach((task) =>{
        if(task.id == id){
            if(add.innerHTML === '+'){
                newItem.value = task.text

                //style
                add.style.borderRadius = '0px'
                add.style.width = '70px'
                add.style.fontSize = '16px'
                add.innerHTML = 'update'
            }
            add.onclick = () => {
                //  style
                add.innerHTML = '+'
                add.style.borderRadius = '50px'
                add.style.width = '50px'
                add.style.fontSize = '32px'

                task.text = newItem.value

                viewPrint(tasksArr)
            }
        }
    })

}

function viewPrint(){
    let htmlList = ''

    tasksArr.forEach(val =>{
        const cls = val.isComplete 
        ? 'todo_task todo_task_complete' 
        : 'todo_task'
        const chacked = val.isComplete 
        ? 'checked'
        : ''

        const taskHtml = `
        <div id='${val.id}' class="${cls}">
        <label class="todo_checkbox">
            <input type="checkbox" ${chacked}>
            <div class="todo_checkbox-div"></div>
        </label>
        <div class="todo_task-text">${val.text}</div>
        <div class="todo_Edit">Edit</div>
        <div class="todo_task-del">-</div>
        </div>`

        htmlList = htmlList + taskHtml
    })

    tasks.innerHTML = htmlList
}

function deleteTask(id,list){
    list.forEach((task, idx) =>{
        if(task.id == id){
            list.splice(idx,1)
        }
    })
}

