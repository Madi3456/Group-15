//temp use later with storage

class _InMemoryTaskModel {
    static taskid = 1;
  
    constructor() {
      this.tasks = [];
    }
  
    async create(task) {
      task.id = _InMemoryTaskModel.taskid++;
      this.tasks.push(task);
      return task;
    }
  
    async read(id = null) {
      if (id) {
        return this.tasks.find((task) => task.id === id);
      }
  
      return this.tasks;
    }
  
    async update(task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      this.tasks[index] = task;
      return task;
    }
  
    async delete(task = null) {
      if (task === null) {
        this.tasks = [];
        return;
      }
  
      const index = this.tasks.findIndex((t) => t.id === task.id);
      this.tasks.splice(index, 1);
      return task;
    }
  }

export default InMemoryTaskModel;