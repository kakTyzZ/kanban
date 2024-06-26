import { ref } from 'vue'
import { defineStore } from 'pinia'

interface ITask {
  title: string
  description: string
}
interface IColumn {
  name: string
  color: string
  tasks: ITask[]
}

interface IBoard {
  title: string
  columns: IColumn[]
}

export const useKanBanStore = defineStore('kanban', () => {
  const boardsList = ref([
    {
      title: 'Board 1',
      columns: [
        {
          name: 'To Do',
          color: 'blue',
          tasks: [
            {
              title: 'Покушать',
              description: 'Скушать два пирожка'
            }
          ]
        },
        {
          name: 'In Progress',
          color: 'yellow',
          tasks: [
            {
              title: 'Попить',
              description: 'Попить лиманчеллы'
            }
          ]
        },
        {
          name: 'Done',
          color: 'purple',
          tasks: [
            {
              title: 'Поспать',
              description: 'Поспать 2 часа'
            }
          ]
        },
        {
          name: 'Review',
          color: 'red',
          tasks: [
            {
              title: 'Погулять',
              description: 'Погулять в лесу'
            }
          ]
        }
      ]
    }
  ])

  const componentsRenderState = ref('')
  const currentBoard = ref('Board 1')
  const currentTaskToEdit = ref()
  const currentColumn = ref()

  function getCurrentBoard() {
    const currentObject = boardsList.value.filter((item) => item.title === currentBoard.value)
    return currentObject
  }
  const addBoard = (board: IBoard) => {
    boardsList.value.push(board)
  }

  const changeState = (state: string) => {
    componentsRenderState.value = state
  }

  return {
    boardsList,
    addBoard,
    componentsRenderState,
    changeState,
    currentBoard,
    getCurrentBoard,
    currentTaskToEdit,
    currentColumn
  }
})
