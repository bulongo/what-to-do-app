// Next version should have a mini setup where a person goes through and customises how they want
// it to look and also if they want their tasks to be shown newer first or older first

// also another nice feature would be to have dates and alarms attached to it


    // import elements here
    const newTask = document.querySelector("#new-task")
    const topEl = document.querySelector("#top")
    const tasksEL = document.querySelector("#tasks")
    const clearAll = document.getElementById("clear-all") 
    
    // create elements here
    const addTaskText = document.createElement("input")
    const confirmText = document.createElement("input")
    const listEl = document.createElement("li")
    const checkBoxEl = document.createElement("input")
    const taskText = document.createElement("input")
    
    taskText.classList.add("task-text")
    // turn off autocomplete for input area
    addTaskText.autocomplete = "off"
    
    // checkbox added to be added to left of task
    checkBoxEl.classList.add("check-box")
    checkBoxEl.type = "checkbox"
    
    // clears local storage, will need to add a warning before clearing
    clearAll.addEventListener("click",(e) =>{
        clearScreen()
        // console.log("I have been clicked")
        localStorage.clear()
        document.location.reload() 
    })
    
    // check if there are any items in local storage, store them to tasks and render them out
    let tasks = []
    let tasksFromStorage = JSON.parse(localStorage.getItem("tasks"))
    
    if(tasksFromStorage){
        tasks = tasksFromStorage
        renderTasks(tasks)
    }

    // Input for new task at the top
    function adder(){
        addTaskText.id = "new-text-input"
        addTaskText.type = 'text'
        addTaskText.placeholder = "Enter new task"
        addTaskText.setAttribute("autofocus","autofocus")
    }
    
    // Add button next to input for task text
    function confirmBtn(){
        confirmText.id = "confirm"
        confirmText.type = "button"
        confirmText.value = "Add"
        // document.location.reload()
    }
    
    // when you click on New Task button, it brings the input and the add button
    function renderInput(){
        topEl.replaceChild(addTaskText,newTask)
        topEl.removeChild(clearAll)
        topEl.appendChild(confirmText)
    }
    


    newTask.addEventListener("click",(e) =>{
        adder()
        confirmBtn()
        renderInput()
    })
    
    confirmText.addEventListener("click",(e) =>{

        if(addTaskText.value){
            // storing to localStorage
            tasks.push(addTaskText.value)
        localStorage.setItem("tasks",JSON.stringify(tasks))


        taskText.value = addTaskText.value
        
        // was initially tring o solve it like this

        // taskText.setAttribute("readonly","readonly")
        // listEl.classList.add("task")
        // listEl.appendChild(checkBoxEl)
        // listEl.appendChild(taskText)

        addTaskText.value = ""
        topEl.replaceChild(newTask,addTaskText)
        topEl.removeChild(confirmText)
        topEl.appendChild(clearAll)
        renderTasks(tasks)
        document.location.reload()
        }else{
            addTaskText.placeholder = "Please enter a task"
            addTaskText.style.color = "crimson"
        }
    })
    
    // this changes the warning to normal color
    // when the user starts typing
    addTaskText.addEventListener("input",(e) => {
        addTaskText.style.color = "white"
    })

    function clearScreen(){
        tasksEL.innerHTML = ""
    }
    
    function renderTasks(tasks){
        // tasksEL.appendChild(listEl)
        // taskText.value = addTaskText.value
        let thingsToShow = ""

        for(let x=0;x < tasks.length;x++){
            thingsToShow += `
            <li class="task">
                <input type="checkbox" class="check-box" />
                <input type="text" class="task-text" value="${tasks[x]}" />
            </li> 
            `
        }
        tasksEL.innerHTML = thingsToShow
        
        const task = document.querySelector(".check-box")
    
        task.addEventListener('click',(e) => {
            if(e.target.checked == true){
                // clearScreen()
                // so instead of clear screen, lets remove that one task and move it in the done category
            }else{
                console.log("Unchecked")
            }
            // task.style.color = "green"
        })
        // now how to strikethrough text if checkbox is checked
        // for(let x =0;x < tasks.length;x++){
        // }
    }   
