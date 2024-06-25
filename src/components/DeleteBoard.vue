<script setup>
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()

const closeComponent = () => {
  kanbanStore.changeState('')
}

const createNewBoardOrColumn = () => {
  kanbanStore.boardsList = kanbanStore.boardsList.filter(
    (board) => board.title !== kanbanStore.currentBoard
  )
  kanbanStore.currentBoard = kanbanStore.boardsList[0].title

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
        <div class="flex text-xl justify-center">Delete the Board?</div>
        <div class="my-3">
          <button
            @click="createNewBoardOrColumn"
            class="w-full bg-red-500 rounded-xl hover:bg-purple-600 text-white"
          >
            Delete the Board
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
