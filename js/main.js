document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let isEditing = false;
    let currentEditIndex = null;

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            const text = document.createElement("span");
            text.textContent = todo.text;

            const divBtn = document.createElement("div");
            divBtn.classList.add("div-btn");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", () => startEditing(index));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteTask(index));

            divBtn.appendChild(editBtn);
            divBtn.appendChild(deleteBtn);
            li.appendChild(text);
            li.appendChild(divBtn);
            todoList.appendChild(li);
        });
    }

    function addTask() {
        const task = todoInput.value.trim();
        if (task) {
            todos.push({ text: task });
            localStorage.setItem("todos", JSON.stringify(todos));
            todoInput.value = "";
            renderTodos();
        }
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    }

    function startEditing(index) {
        todoInput.value = todos[index].text;
        addBtn.textContent = "Edit";
        isEditing = true;
        currentEditIndex = index;
    }

    function editTask() {
        const task = todoInput.value.trim();
        if (task) {
            todos[currentEditIndex].text = task;
            localStorage.setItem("todos", JSON.stringify(todos));
            todoInput.value = "";
            addBtn.textContent = "Add";
            isEditing = false;
            currentEditIndex = null;
            renderTodos();
        }
    }

    addBtn.addEventListener("click", () => {
        if (isEditing) {
            editTask();
        } else {
            addTask();
        }
    });

    renderTodos();
});

// document.addEventListener("DOMContentLoaded", function () {
//     const todoInput = document.getElementById("todo-input");
//     const addBtn = document.getElementById("add-btn");
//     const todoList = document.getElementById("todo-list");

//     let todos = JSON.parse(localStorage.getItem("todos")) || [];

//     function renderTodos() {
//         todoList.innerHTML = "";

//         todos.forEach((todo, index) => {
//             const li = document.createElement("li");
//             const text = document.createElement("span");
//             text.textContent = todo.text;

//             const editBtn = document.createElement("button");
//             editBtn.textContent = "Edit";
//             editBtn.classList.add("edit-btn");
//             editBtn.addEventListener("click", () => editTask(index));

//             const deleteBtn = document.createElement("button");
//             deleteBtn.textContent = "Delete";
//             deleteBtn.classList.add("delete-btn");
//             deleteBtn.addEventListener("click", () => deleteTask(index));

//             li.appendChild(text);
//             li.appendChild(editBtn);
//             li.appendChild(deleteBtn);
//             todoList.appendChild(li);
//         });
//     }

//     function addTask() {
//         const task = todoInput.value.trim();
//         if (task) {
//             todos.push({ text: task });
//             localStorage.setItem("todos", JSON.stringify(todos));
//             todoInput.value = "";
//             renderTodos();
//         }
//     }

//     function deleteTask(index) {
//         todos.splice(index, 1);
//         localStorage.setItem("todos", JSON.stringify(todos));
//         renderTodos();
//     }

//     function editTask(index) {
//         const newTask = prompt("Edit task:", todos[index].text);

//         if (newTask !== null) {
//             todos[index].text = newTask;
//             localStorage.setItem("todos", JSON.stringify(todos));
//             renderTodos();
//         }
//     }

//     addBtn.addEventListener("click", addTask);

//     renderTodos();
// });
