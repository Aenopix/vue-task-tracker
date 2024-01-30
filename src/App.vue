<script setup>
import { ref } from 'vue';

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
</script>

<template>
  <main>
    <form class="task-form" @submit.prevent>
      <label for="title">Title</label>
      <input type="text" id="title" />

      <label for="description">Description</label>
      <textarea name="descrtiption" id="description"></textarea>

      <label for="status">Status</label>
      <select name="status" id="status">
        <option value="done">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="not-done">Not Done</option>
      </select>

      <button>Create Task</button>
    </form>

    <ul class="task-list">
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