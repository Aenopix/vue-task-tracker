<script setup>
import { ref } from 'vue';
import { vAutoAnimate } from '@formkit/auto-animate'

const taskList = ref([{
  id: 1,
  description: 'Sopitfy song',
  status: 'not-done',
  title: 'Jesus Coming to Clean House'
}, {
  id: 2,
  description: 'Finish the task list project',
  status: 'in-progress',
  title: 'Finish the project'
}, {
  id: 3,
  description: 'Check the wood blanks in stair and outside',
  status: 'done',
  title: 'Check Wood Blanks'
}])

const statusEmoji = (status) => {
  if (status === 'not-done') return '❌'
  if (status === 'in-progress') return '⚙️'
  return '✔️'
}

const formData = ref({
  id: 0,
  description: '',
  status: 'not-done',
  title: ''
})

const handleSubmit = () => {
  const newTask = {
    id: Date.now(),
    description: formData.value.description,
    status: formData.value.status,
    title: formData.value.title
  }

  taskList.value = [...taskList.value, newTask]

  formData.value = {
    id: 0,
    description: '',
    status: 'not-done',
    title: ''
  }
}
</script>

<template>
  <main>
    <form class="task-form" @submit.prevent="handleSubmit">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="formData.title" required />
      <label for="description">Description</label>
      <textarea name="descrtiption" id="description" v-model="formData.description" required></textarea>
      <label for="status">Status</label>
      <select name="status" id="status" v-model="formData.status">
        <option value="not-done">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button>Create Task</button>
    </form>

    <ul class="task-list" v-auto-animate>
      <li class="task-item" v-for="task in taskList" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <span class="status">{{ statusEmoji(task.status) }}</span>
        <div class="buttons-container">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <button class="done-btn">Done</button>
        </div>
      </li>
    </ul>
  </main>
</template>