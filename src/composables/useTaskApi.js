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

  return { taskList, fetchTasks, createTask }
}