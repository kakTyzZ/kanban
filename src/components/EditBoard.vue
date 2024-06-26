<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()

const localState = ref('')

const closeComponent = () => {
  kanbanStore.changeState('')
}

const createNewBoardOrColumn = () => {
  const foundBoard = kanbanStore.boardsList.find(
    (board) => board.title === kanbanStore.currentBoard
  )
  if (foundBoard) {
    foundBoard.title = localState.value
  }

  kanbanStore.componentsRenderState = ''
}
</script>

<template>
  <div class="fixed left-0 top-0 right-0 bottom-0 bg-black/50 z-200 text-white">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-[350px] h-[180px] rounded-xl"
    >
      <div class="p-2 flex gap-3 flex-col opacity-100 h-full justify-between">
        <div class="flex justify-end text-xl text-white">
          <span>
            <button @click="closeComponent">
              <Icon icon="carbon:close-outline" />
            </button>
          </span>
        </div>

        <div class="flex flex-col gap-3 py-3">
          <div>
            <input
              class="bg-gray-500 w-full border rounded px-3 py-2"
              type="text"
              placeholder="Enter new board name"
              v-model="localState"
            />
          </div>
        </div>
        <div class="my-3">
          <button
            @click="createNewBoardOrColumn"
            class="w-full bg-purple-500 rounded-xl hover:bg-purple-600 text-white"
          >
            Change board name
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
