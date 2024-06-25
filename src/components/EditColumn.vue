<script setup>
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '../stores/Kanban'

const kanbanStore = useKanBanStore()

const localState = reactive({
  name: '',
  color: ''
})

const closeComponent = () => {
  kanbanStore.changeState('')
}

const updateColor = (e) => {
  localState.color = e.target.value
  console.log('localState.color', localState.color)
}
const updateColumn = () => {
  const currentBoard = kanbanStore.getCurrentBoard()
  const xxx = [...currentBoard[0].columns]

  const indexofCol = xxx.findIndex((el) => el.name === kanbanStore.currentColumn.name)

  kanbanStore.componentsRenderState = ''
  if (localState.name !== '') {
    xxx[indexofCol].name = localState.name
  }

  xxx[indexofCol].color = localState.color
}

function deleteColumn() {
  const currentBoard = kanbanStore.getCurrentBoard()
  const xxx = [...currentBoard[0].columns]

  const indexofCol = xxx.findIndex((el) => el.name === kanbanStore.currentColumn.name)

  currentBoard[0].columns.splice(indexofCol, 1)

  kanbanStore.componentsRenderState = ''
}
</script>

<template>
  <div class="fixed left-0 top-0 right-0 bottom-0 bg-black/50 z-200 text-white">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-[350px] h-[320px] rounded-xl"
    >
      <div class="p-2 flex gap-3 flex-col opacity-100 h-full justify-between">
        <div class="flex justify-between">
          <div>
            Current name -
            <span class="text-purple-400 text-xl">{{ kanbanStore.currentColumn.name }}</span>
          </div>
          <div class="flex justify-end text-xl text-white">
            <span>
              <button @click="closeComponent">
                <Icon icon="carbon:close-outline" />
              </button>
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-3 py-1">
          <div>
            <input
              class="bg-gray-500 w-full border rounded px-3 py-2"
              type="text"
              placeholder="Enter new column name"
              v-model="localState.name"
            />
          </div>
          <div class="flex flex-col justify-center gap-3">
            <div class="flex gap-2">
              <div>Choose color -</div>
              <div
                :style="{ backgroundColor: localState.color }"
                class="rounded-full w-[25px] h-[25px]"
              ></div>
            </div>

            <div class="flex gap-3 justify-center">
              <button
                @click="updateColor"
                value="lightgreen"
                class="bg-green-500 rounded-full w-[25px] h-[25px] cursor-pointer hover:border-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-300"
              ></button>
              <button
                @click="updateColor"
                value="yellow"
                class="bg-yellow-500 rounded-full w-[25px] h-[25px] cursor-pointer hover:border-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-300"
              ></button>
              <button
                @click="updateColor"
                value="red"
                class="bg-red-500 rounded-full w-[25px] h-[25px] cursor-pointer hover:border-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-300"
              ></button>
              <button
                @click="updateColor"
                value="purple"
                class="bg-purple-500 rounded-full w-[25px] h-[25px] cursor-pointer hover:border-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-300"
              ></button>
              <button
                @click="updateColor"
                value="black"
                class="bg-black rounded-full w-[25px] h-[25px] cursor-pointer hover:border-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-300"
              ></button>
            </div>
          </div>
        </div>
        <div class="flex flex-1">
          <button
            @click="updateColumn"
            class="w-full bg-purple-500 py-[2%] rounded-xl hover:bg-purple-600 max-h-[40px] text-white"
          >
            Update Column
          </button>
        </div>
        <span class="h-[2px] w-full bg-white"></span>
        <div class="my-[1%]">
          <button
            @click="deleteColumn"
            class="w-full bg-red-500 py-[2%] rounded-xl hover:bg-purple-600 text-white"
          >
            Delete this Column
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
