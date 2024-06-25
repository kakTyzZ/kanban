<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import Main from './components/Main.vue'
import AddNew from './components/AddNew.vue'
import AddNewTask from './components/AddNewTask.vue'
import EditBoard from './components/EditBoard.vue'
import DeleteBoard from './components/DeleteBoard.vue'
import EditColumn from './components/EditColumn.vue'
import { useKanBanStore } from './stores/Kanban'

const kanbanStore = useKanBanStore()
</script>

<template>
  <div class="w-screen h-screen flex">
    <SideBar />
    <Main />
    <EditColumn v-if="kanbanStore.componentsRenderState === 'editColumn'" />
    <EditBoard v-if="kanbanStore.componentsRenderState === 'editBoard'" />
    <DeleteBoard v-if="kanbanStore.componentsRenderState === 'deleteBoard'" />
    <AddNew
      v-if="kanbanStore.componentsRenderState === 'newBoard'"
      title="Add New Board"
      subtitle="Enter Board Name"
      buttonName="Create Board"
    />
    <AddNew
      v-if="kanbanStore.componentsRenderState === 'newColumn'"
      title="Create New Column"
      subtitle="Column name"
      buttonName="Create Column"
    />
    <AddNewTask v-if="kanbanStore.componentsRenderState === 'newTask'" />
  </div>
</template>
