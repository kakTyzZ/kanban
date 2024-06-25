<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()

const localState = ref('')

const props = defineProps({
  title: String,
  subtitle: String,
  buttonName: String
})

const closeComponent = () => {
  kanbanStore.changeState('')
}

const createNewBoardOrColumn = () => {
  if (props.title === 'Add New Board') {
    kanbanStore.addBoard({
      title: localState.value,
      columns: []
    })
    kanbanStore.currentBoard = localState.value
  }

  if (props.title === 'Create New Column') {
    const board = kanbanStore.boardsList.find((el) => el.title === kanbanStore.currentBoard)

    board.columns.push({
      name: localState.value,
      color: 'green',
      tasks: []
    })
  }

  kanbanStore.componentsRenderState = ''
}
</script>

<template>
  <div class="fixed left-0 top-0 right-0 bottom-0 bg-black/50 z-200 text-white">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-[350px] h-[200px] rounded-xl"
    >
      <div class="p-3 flex gap-3 flex-col opacity-100">
        <div class="flex justify-between text-white items-center">
          <div class="text-xl">
            <strong>{{ props.title }}</strong>
          </div>
          <span>
            <button @click="closeComponent">
              <Icon icon="carbon:close-outline" />
            </button>
          </span>
        </div>

        <div class="flex flex-col gap-3 py-3">
          <div class="text-white opacity-60">{{ props.subtitle }}</div>
          <div>
            <input
              class="bg-gray-500 w-full border rounded px-3 py-1"
              type="text"
              placeholder="Enter Board Name"
              v-model="localState"
            />
          </div>
        </div>
        <div class="">
          <button
            @click="createNewBoardOrColumn"
            class="w-full bg-purple-500 rounded-xl hover:bg-purple-600 text-white"
          >
            {{ props.buttonName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
