<script setup>
defineProps({
  taskList: Array
})

const emit = defineEmits([
  'handleEditTask',
  'handleDeleteTask',
  'handleDoneTask'
])

const statusEmoji = (status) => {
  if (status === 'not-done') return '❌'
  if (status === 'in-progress') return '⚙️'
  return '✔️'
}
</script>

<template>
  <li class="task-item" v-for="task in taskList" :key="task.id">
    <span class="task-id">{{ task.id }}</span>
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <span class="status">{{ statusEmoji(task.status) }}</span>
    <div class="buttons-container">
      <button class="edit-btn" @click="emit('handleEditTask', task)">Edit</button>
      <button class="delete-btn" @click="emit('handleDeleteTask', task.id)">Delete</button>
      <button class="done-btn" @click="emit('handleDoneTask', task.id, task)"
        :disabled="task.status === 'done'">Done</button>
    </div>
  </li>
  <!-- <li class="task-item" v-for="task in taskList" :key="task.id">
        <span class="task-id">{{ task.id }}</span>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <span class="status">{{ statusEmoji(task.status) }}</span>
        <div class="buttons-container">
          <button class="edit-btn" @click="handleEditTask(task)">Edit</button>
          <button class="delete-btn" @click="handleDeleteTask(task.id)">Delete</button>
          <button class="done-btn" @click="handleDoneTask(task.id)">Done</button>
        </div>
      </li> -->
</template>