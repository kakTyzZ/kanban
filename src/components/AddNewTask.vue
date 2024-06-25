<script setup>
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()
const taskValue = reactive({
  title: '',
  description: ''
})

function createTask() {
  kanbanStore.changeState('')
  const board = kanbanStore.boardsList.find((el) => el.title === kanbanStore.currentBoard)

  board.columns[0].tasks.push({
    title: taskValue.title,
    description: taskValue.description
  })
}
</script>

<template>
  <div class="fixed left-0 top-0 right-0 bottom-0 bg-black/50 z-200 text-white">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-[350px] h-[350px] rounded-xl p-1"
    >
      <div class="p-3 flex gap-3 flex-col opacity-100">
        <div class="flex justify-between text-white items-center">
          <div class="text-xl">
            <strong>Add New Task</strong>
          </div>
          <span @click="kanbanStore.changeState('')"><Icon icon="carbon:close-outline" /></span>
        </div>

        <div>
          <div class="text-gray-300">Title</div>
          <input
            v-model="taskValue.title"
            type="text"
            class="w-full bg-gray-500 border border-white px-2 py-1 rounded"
            placeholder="e.g Take coffee break"
          />
        </div>

        <div>
          <div class="text-gray-300">Description</div>
          <textarea
            v-model="taskValue.description"
            class="w-full p-1 border bg-gray-500 rounded px-2 py-1"
            name=""
            id=""
            cols="35"
            rows="3"
            placeholder="e.g Do something not related to code"
          ></textarea>
        </div>

        <div>
          <div class="text-white/50">Status</div>

          <select
            name="pets"
            id="pet-select"
            class="w-full bg-gray-500 border border-white rounded text-white"
          >
            <option value="dog">To do</option>
            <option value="cat">In Progress</option>
          </select>
        </div>

        <div>
          <button
            @click="createTask"
            class="w-full bg-purple-500 rounded-xl hover:bg-purple-600 text-white"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
