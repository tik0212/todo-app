const button = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const ul = document.getElementById("tasklist")

function addTask() {
  if (input.value.trim() === "") return;

  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = input.value;
  span.classList.add("span")

  let remove = document.createElement("button");
  remove.textContent = "×";
  remove.classList.add("remove-btn")

  let done = document.createElement("button");
  done.textContent = "done";
  done.classList.add("done-btn")

  li.appendChild(span);
  li.appendChild(remove);
  li.appendChild(done);

  ul.appendChild(li);

  remove.addEventListener("click", function() {
    li.remove();
  });

  done.addEventListener("click", function() {
    span.classList.toggle("done");

    span.classList.contains("done")? ul.appendChild(li) : ul.prepend(li);

  });
  input.value = "";
};

button.addEventListener("click", addTask);
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") addTask();
});
