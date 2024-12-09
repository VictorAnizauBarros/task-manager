const taskService = require("../services/taskService");
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.findTasksByUserId(req.session.userId);
    res.render("main", {
      title: "Tarefas",
      body: "./content/tasks",
      tasks,
    });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};
exports.createTask = async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.redirect("/tasks");
  }
  try {
    await taskService.createTask(title, req.session.userId);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    res.status(500).send("Erro ao adicionar tarefa.");
  }
};
exports.toggleTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const task = await taskService.findTaskById(taskId, req.session.userId);
    if (!task) {
      return res.status(404).send("Tarefa não encontrada.");
    }
    await taskService.toggleTaskStatus(taskId, !task.completed);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).send("Erro ao atualizar tarefa.");
  }
};
exports.deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    await taskService.deleteTask(taskId, req.session.userId);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).send("Erro ao excluir tarefa.");
  }
};
