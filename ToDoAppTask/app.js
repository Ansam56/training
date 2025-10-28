document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const clearBtn = document.getElementById("clear-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", handleTaskInputkeydown);
  taskList.addEventListener("click", handleTaskListClick);
  clearBtn.addEventListener("click", clearCompleted);

  renderTasks();

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  }

  function handleTaskInputkeydown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function handleTaskListClick(e) {
    const checkbox = e.target.closest(".task-checkbox");
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");

    if (checkbox) {
      toggleTask(checkbox.dataset.index);
    } else if (editBtn) {
      editTask(editBtn.dataset.index);
    } else if (deleteBtn) {
      deleteTask(deleteBtn.dataset.index);
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function editTask(index) {
    const taskItem = taskList.children[index];
    const currentText = tasks[index].text;

    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${
        tasks[index].completed ? "checked" : ""
      } data-index="${index}">
      <input type="text" class="edit-input" value="${currentText}">
       <div class="task-actions">
          <button class="edit-btn" data-index="${index}"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete-btn" data-index="${index}"><i class="fa-solid fa-x"></i></button>
        </div>
    `;

    const editInput = taskItem.querySelector(".edit-input");
    editInput.focus();

    const saveEdit = () => {
      const newText = editInput.value.trim();
      if (newText) {
        tasks[index].text = newText;
      }
      renderTasks();
    };

    editInput.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && saveEdit()
    );
    editInput.addEventListener("blur", saveEdit);
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  function updateProgress() {
    const completedTasks = tasks.reduce(
      (cnt, t) => cnt + (t.completed ? 1 : 0),
      0
    );
    const total = tasks.length;
    const percentage = total > 0 ? (completedTasks / total) * 100 : 0;

    progressFill.style.width = `${percentage}%`;
    progressText.innerHTML = `<strong>${completedTasks}</strong> of <strong>${total}</strong> tasks done`;
  }

  function clearCompleted() {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = tasks
      .map(
        (task, index) => `
      <li class="task-item ${task.completed ? "checked" : ""}">
        <input type="checkbox" class="task-checkbox" ${
          task.completed ? "checked" : ""
        } data-index="${index}">
        <span class="task-text ${task.completed ? "completed" : ""}">${
          task.text
        }</span>
        <div class="task-actions">
          <button class="edit-btn" data-index="${index}"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete-btn" data-index="${index}"><i class="fa-solid fa-x"></i></button>
        </div>
      </li>
    `
      )
      .join("");

    updateProgress();
    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
