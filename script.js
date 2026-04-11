const button = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const ul = document.getElementById("tasklist");

function createTaskListElement(text, isDone = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("span");
  if (isDone) span.classList.add("done");

  const remove = document.createElement("button");
  remove.textContent = "×";
  remove.classList.add("remove-btn");

  const done = document.createElement("button");
  done.textContent = "done";
  done.classList.add("done-btn");

  li.append(span, remove, done);

  remove.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  done.addEventListener("click", function () {
    span.classList.toggle("done");
    span.classList.contains("done") ? ul.append(li) : ul.prepend(li);
    saveTasks()
  });

  return li;
}

function addTask() {
  if (input.value.trim() === "") return;

  const li = createTaskListElement(input.value);
  ul.append(li);

  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#tasklist li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".span").textContent,
      isDone: li.querySelector(".span").classList.contains("done"),
    });
  });
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("myTasks");

  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach((task) => {
      const li = createTaskListElement(task.text, task.isDone);
      ul.append(li);
    });
  }
}

loadTasks();

button.addEventListener("click", addTask);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addTask();
});
