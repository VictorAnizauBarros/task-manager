const prisma = require("../config/database");
class TaskService {
  async findTasksByUserId(userId) {
    return prisma.tasks.findMany({
      where: { userId: userId },
      orderBy: { id: "desc" },
    });
  }
  async createTask(title, userId) {
    return prisma.tasks.create({
      data: {
        title,
        userId: userId,
      },
    });
  }
  async findTaskById(taskId, userId) {
    return prisma.tasks.findFirst({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  }
  async toggleTaskStatus(taskId, completed) {
    return prisma.tasks.update({
      where: { id: taskId },
      data: { completed },
    });
  }
  async deleteTask(taskId, userId) {
    return prisma.tasks.deleteMany({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  }
}
module.exports = new TaskService();
