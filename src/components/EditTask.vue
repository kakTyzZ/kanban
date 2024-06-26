<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

interface ICol {
  name: string
  tasks: []
}

const kanbanStore = useKanBanStore()

const taskToEdit = reactive({
  title: kanbanStore.currentTaskToEdit.title,
  description: kanbanStore.currentTaskToEdit.description
})

function saveChanges() {
  const currentBoard = kanbanStore.getCurrentBoard()
  const xxx = [...currentBoard[0].columns]

  const indexofCol = xxx.findIndex((el) => el.name === kanbanStore.currentColumn.name)

  console.log(xxx[indexofCol])
  kanbanStore.componentsRenderState = ''
  xxx[indexofCol].tasks = xxx[indexofCol].tasks.map((el) => {
    if (el.title === kanbanStore.currentTaskToEdit.title) {
      return taskToEdit
    } else {
      return el
    }
  })
}

function deleteThisTask() {
  const currentBoard = kanbanStore.getCurrentBoard()
  const xxx = [...currentBoard[0].columns]

  const indexofCol = xxx.findIndex((el) => el.name === kanbanStore.currentColumn.name)

  xxx[indexofCol].tasks = xxx[indexofCol].tasks.filter(
    (el) => el.title !== kanbanStore.currentTaskToEdit.title
  )

  kanbanStore.componentsRenderState = ''
}
</script>

<template>
  <div
    class="absolute right-0 bg-gray-600 rounded p-4 text-xl border border-white h-full max-w-[20%] w-full text-white z-50"
  >
    <div class="flex flex-col">
      <div class="">
        <div class="flex items-center mb-[5%] justify-between">
          <div class="text-2xl text-purple-500">Edit Task</div>
          <div
            @click="kanbanStore.componentsRenderState = ''"
            class="cursor-pointer hover:bg-purple-600 rounded-xl"
          >
            <Icon icon="carbon:close-outline" />
          </div>
        </div>

        <div>
          <div class="opacity-60">Title</div>
          <input
            type="text"
            class="w-full bg-gray-500 border border-white px-2 py-1 rounded"
            :placeholder="kanbanStore.currentTaskToEdit.title"
            v-model="taskToEdit.title"
          />
        </div>

        <div>
          <div class="opacity-60">Description</div>
          <textarea
            class="w-full p-1 border bg-gray-500 rounded px-2 py-1"
            name=""
            id=""
            cols="35"
            rows="3"
            :placeholder="kanbanStore.currentTaskToEdit.description"
            v-model="taskToEdit.description"
          ></textarea>
        </div>

        <div>
          <div class="opacity-60">Status</div>
          <select
            name="actions"
            id="actions-select"
            class="w-full text p-1 bg-gray-500 border border-white rounded text-white"
          >
            <option value="toDo">To do</option>
            <option value="inProgress">In Progress</option>
          </select>
        </div>

        <div class="flex justify-center mt-3 flex-1">
          <button
            class="w-full bg-purple-500 rounded-xl hover:shadow hover:shadow-red-100 hover:bg-purple-600 text-white"
            @click="saveChanges"
          >
            Save
          </button>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 mb-[5%]">
        <div class="flex justify-center">
          <button
            class="w-[90%] bg-red-500 rounded-xl hover:shadow hover:shadow-red-100 hover:bg-red-600 text-white"
            @click="deleteThisTask"
          >
            Delete this Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
