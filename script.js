const addBtn = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const ul = document.getElementById("tasklist");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

function createTask(text, isDone = false) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.classList.add("task-text");
  if (isDone) taskText.classList.add("done");

  const remove = document.createElement("button");
  remove.textContent = "×";
  remove.classList.add("remove-btn");

  const done = document.createElement("button");
  done.textContent = "done";
  done.classList.add("done-btn");

  li.append(taskText, remove, done);

  remove.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  done.addEventListener("click", function () {
    taskText.classList.toggle("done");
    if (taskText.classList.contains("done")) {
      ul.append(li);
    } else {
      ul.prepend(li);
    }
    saveTasks();
  });

  return li;
}

function addTask() {
  if (input.value.trim() === "") return;

  const li = createTask(input.value);
  ul.append(li);

  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];

  ul.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      isDone: li.querySelector(".task-text").classList.contains("done"),
    });
  });
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("myTasks");

  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach((task) => {
      const li = createTask(task.text, task.isDone);
      ul.append(li);
    });
  }
}

function setActiveButton(button) {
  const buttons = document.querySelectorAll(".filter-buttons button");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
}

loadTasks();

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addTask();
});

allBtn.addEventListener("click", function () {
  const tasks = ul.querySelectorAll("li");

  tasks.forEach((li) => {
    li.style.display = "flex";
  });
  setActiveButton(allBtn);
});

activeBtn.addEventListener("click", function () {
  const tasks = ul.querySelectorAll("li");

  tasks.forEach((li) => {
    const isDone = li.querySelector(".task-text").classList.contains("done");

    if (isDone) {
      li.style.display = "none";
    } else {
      li.style.display = "flex";
    }
  });
  setActiveButton(activeBtn);
});

completedBtn.addEventListener("click", function () {
  const tasks = ul.querySelectorAll("li");

  tasks.forEach((li) => {
    const isDone = li.querySelector(".task-text").classList.contains("done");

    if (isDone) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
});
