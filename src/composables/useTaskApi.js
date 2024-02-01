import { ref } from 'vue'

const baseUrl = 'http://localhost:8080'

export default function useTaskApi() {
  const taskList = ref([])

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}/tasks`)
      const data = await response.json()

      taskList.value = data
    } catch (error) {
      console.log('Error fetching tasks: ', error);
    }
  }

  const createTask = async (taskData) => {
    try {
      const response = await fetch(`${baseUrl}/add-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json()
      console.log(data);
    } catch (error) {
      return ''
    }
  }

  const editTask = async (taskId, taskData) => {
    try {
      const response = await fetch(`${baseUrl}/edit-task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        return updatedTask
      } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${baseUrl}/delete-task/${taskId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        console.log('Task deleted successfully!');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  }

  return { taskList, fetchTasks, createTask, editTask, deleteTask }
}