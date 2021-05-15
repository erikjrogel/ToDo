const toDoButton = document.getElementById("btn");
const inputField = document.getElementById("inputField");
const container = document.getElementById("container");
const ul = document.querySelector("ul");

toDoButton.addEventListener("click", () => {
  fetch("http://localhost:3000/todo", {
    method: "POST",
    body: JSON.stringify({ message: inputField.value }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      const template = document.createElement("div");
      template.setAttribute("class", data.todo_id);
      const listItem = `
            <li class="list-item">
             <span class="todo-content">${data.message}</span>
             <button class="to-do-edit">Edit</button>
             <button class="to-do-delete">Delete</button>
            </li>`;
      template.innerHTML = listItem;
      ul.appendChild(template);
    });
});

const fetchTodo = async () => {
  const res = await fetch("http://localhost:3000/todo");
  const data = await res.json();
  return data;
};

fetchTodo().then((todolist) => {
  todolist.forEach((todo) => {
    const template = document.createElement("div");
    template.setAttribute("class", todo.todo_id);

    const listItem = `
            <li class="list-item">
             <span class="todo-content">${todo.message}</span>
             <button class="to-do-edit">Edit</button>
             <button class="to-do-delete">Delete</button>
            </li>`;
    template.innerHTML = listItem;
    ul.appendChild(template);
  });
});

const delButton = document.addEventListener("click", (e) => {
  if (e.target.className == "to-do-delete") {
    const todo_id = e.target.parentNode.parentNode.className;
    e.target.parentNode.parentNode.remove();

    fetch(`http://localhost:3000/todo`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
});
