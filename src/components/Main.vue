<script setup lang="ts">
import EditTask from './EditTask.vue'
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted, reactive } from 'vue'
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus'
import { Icon } from '@iconify/vue'
import { useKanBanStore } from '@/stores/Kanban'

interface ITask {
  title: string
  description: string
}

interface IColumn {
  title: string
  tasks: ITask[]
}

const kanbanStore = useKanBanStore()
const { currentBoard } = storeToRefs(kanbanStore)
const board = ref()
const elementBlurClass = reactive({
  blurClass: false
})

watch(currentBoard, () => {
  board.value = kanbanStore.getCurrentBoard()[0].columns
})

onMounted(() => {
  board.value = kanbanStore.getCurrentBoard()[0].columns
})

function editTask(column: IColumn, item: ITask) {
  kanbanStore.changeState('editTask')
  kanbanStore.currentTaskToEdit = item
  kanbanStore.currentColumn = column
  console.log('currentTaskToEdit', kanbanStore.currentTaskToEdit)
}

function editColumn(colName: IColumn) {
  kanbanStore.changeState('editColumn')
  kanbanStore.currentColumn = colName
}

function onStart(event: SortableEvent) {
  elementBlurClass.blurClass = true
}

function onEnd(event: SortableEvent) {
  elementBlurClass.blurClass = false
}

const el = ref<HTMLElement | null>(null)
</script>

<template>
  <section class="w-full">
    <EditTask v-if="kanbanStore.componentsRenderState === 'editTask'" />
    <div
      class="flex bg-slate-600 max-h-[10%] h-full w-full text-white items-center justify-between p-4"
    >
      <div class="flex gap-2 text-xl">
        <div>{{ currentBoard }}</div>
        <ul class="flex gap-2 text-3xl">
          <li
            class="cursor-pointer rounded-xl hover:text-purple-500 hover:shadow hover:shadow-red-200"
            @click="kanbanStore.changeState('editBoard')"
          >
            <Icon icon="material-symbols-light:edit-outline" />
          </li>

          <li
            class="cursor-pointer rounded-xl hover:text-purple-500 hover:shadow hover:shadow-red-200"
            @click="kanbanStore.changeState('deleteBoard')"
          >
            <Icon icon="material-symbols-light:delete-outline" />
          </li>
        </ul>
      </div>

      <div class="flex gap-2 items-center mr-[2%]">
        <button
          @click="kanbanStore.changeState('newTask')"
          class="bg-gray-500 px-3 py-1 opacity cursor-pointer rounded-xl hover:text-purple-500 hover:shadow hover:shadow-red-200 hover:bg-gray-300"
        >
          + Add New Task
        </button>
        <div><Icon icon="simple-line-icons:options-vertical" /></div>
      </div>
    </div>

    <div class="h-[90%] bg-slate-500 relative w-full">
      <div v-if="kanbanStore.boardsList.length > 0" class="w-full flex gap-2 items-center h-full">
        <div
          class="w-full max-w-[25%] h-full border border-teal-200 py-2 rounded-xl"
          v-for="item in board"
        >
          <div class="text-white text-xl flex justify-around items-center">
            <div class="flex gap-2 items-center">
              <div
                :style="{
                  backgroundColor: item.color
                }"
                class="rounded-full w-4 h-4"
              ></div>
              {{ item.name }} ({{ item.tasks.length }})
            </div>

            <Icon
              @click="editColumn(item)"
              class="cursor-pointer text-2xl hover:shadow-inner hover:shadow-red-100 rounded-2xl"
              icon="simple-line-icons:options-vertical"
            />
          </div>
          <VueDraggable
            @start="onStart"
            @end="onEnd"
            class="flex flex-col gap-2 p-4 m-auto rounded overflow-auto h-full"
            ref="el"
            v-model="item.tasks"
            group="people"
          >
            <div v-for="i in item.tasks" :key="item.name">
              <div
                @click="editTask(item, i)"
                class="flex flex-col p-1 h-[150px] break-words text-sm shadow-2xl border-1 border-y-2 border-purple-800 rounded-xl text-white hover:shadow-xl hover:shadow-red-100"
                :class="elementBlurClass"
              >
                <div class="py-2">{{ i.title }}</div>
                <div class="">{{ i.description }}</div>
              </div>
            </div>
          </VueDraggable>
        </div>

        <div class="">
          <button @click="kanbanStore.changeState('newColumn')" class="text-2xl text-white">
            + New Column
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 2.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.blurClass {
  filter: blur(1px);
}
</style>
