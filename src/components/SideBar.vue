<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()

function createNewBoard() {
  kanbanStore.changeState('newBoard')
}
</script>

<template>
  <div class="max-w-[20%] bg-slate-600 h-screen shadow py-3 px-4 text-purple-500">
    <div class="text-3xl flex items-center">
      <span><Icon icon="ph:kanban-bold" /></span>
      <span class="text-white">kanban</span>
    </div>

    <div class="opacity-50 my-4 text-white">ALL BOARDS ({{ kanbanStore.boardsList.length }})</div>

    <div class="my-4 flex flex-col gap-2 text-2xl shadow">
      <div class="flex flex-col items-start" v-for="item in kanbanStore.boardsList">
        <button
          @click="kanbanStore.currentBoard = item.title"
          class="cursor-pointer rounded-xl hover:shadow hover:shadow-red-200 w-full flex p-2"
        >
          {{ item.title }}
        </button>
      </div>
    </div>

    <div
      class="flex items-center gap-2 cursor-pointer rounded-xl hover:shadow hover:shadow-red-200"
    >
      <button @click="createNewBoard" class="flex items-center gap-1 p-2">
        <span><Icon icon="fluent:grid-kanban-16-regular" /></span>
        <div class="whitespace-nowrap">+ Create New Board</div>
      </button>
    </div>
  </div>
</template>
