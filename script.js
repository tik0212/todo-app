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
    const currentText = li.querySelector(".task-text");
    currentText.classList.toggle("done");

    if (currentText.classList.contains("done")) {
      ul.append(li);
    } else {
      ul.prepend(li);
    }
    saveTasks();
  });

  taskText.addEventListener("dblclick", function () {
    editTask(li);
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

function editTask(li) {
  const taskText = li.querySelector(".task-text");
  const currentText = taskText.textContent;
  const wasDone = taskText.classList.contains("done");

  const input = document.createElement("input");
  input.value = currentText;

  taskText.replaceWith(input);
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      input.blur();
    }
  });

  input.addEventListener("blur", function () {
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = input.value;
    if (wasDone) taskText.classList.add("done");

    input.replaceWith(taskText);

    taskText.addEventListener("dblclick", function () {
      editTask(li);
    });

    saveTasks();
  });
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
  setActiveButton(completedBtn);
});
