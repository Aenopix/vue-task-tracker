<script setup>
import { onMounted, ref } from 'vue';
import { vAutoAnimate } from '@formkit/auto-animate'
import useTaskApi from '@/composables/useTaskApi'
import Task from './components/Task.vue'

const { taskList, fetchTasks, createTask, editTask, deleteTask } = useTaskApi()

const formData = ref({
  id: 0,
  description: '',
  status: 'not-done',
  title: ''
})

const isEditing = ref(false)
const handleSubmit = async () => {
  if (formData.value.id) {
    // edit task
    await editTask(formData.value.id, formData.value);
    await fetchTasks();

    isEditing.value = false;
  } else {
    // create task
    const newTask = {
      description: formData.value.description,
      status: formData.value.status,
      title: formData.value.title
    };

    await createTask(newTask)
    await fetchTasks()
  }

  formData.value = {
    id: null,
    description: '',
    status: 'not-done',
    title: ''
  }
}

const handleDeleteTask = async (taskId) => {
  await deleteTask(taskId)
  await fetchTasks()
}

const handleEditTask = (task) => {
  isEditing.value = true
  formData.value = { ...task }
}

const handleDoneTask = async (taskId, task) => {
  task.status = 'done'
  
  await editTask(taskId, task);
  await fetchTasks();
}

onMounted(async () => {
  await fetchTasks()
})
</script>

<template>
  <main>
    <form class="task-form" @submit.prevent="handleSubmit">
      <label for="title">Title</label>
      <input type="text" id="title" v-model.trim="formData.title" required />
      <label for="description">Description</label>
      <textarea name="descrtiption" id="description" v-model.trim="formData.description" required></textarea>
      <label for="status">Status</label>
      <select name="status" id="status" v-model="formData.status">
        <option value="not-done">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button>{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>

    <ul class="task-list" v-auto-animate>
      <Task :task-list="taskList" @handle-edit-task="handleEditTask" @handle-delete-task="handleDeleteTask"
        @handle-done-task="handleDoneTask" />
    </ul>
  </main>
</template>