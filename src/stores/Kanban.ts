import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

interface IBoard {
  title: string
  columns: {
    title: string
    tasks: {
      title: string
      description: string
    }[]
  }[]
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
    },
    {
      title: 'Board 2',
      columns: [
        {
          name: 'Column 111111111111',
          color: 'red',
          tasks: [
            {
              title: 'Task 111111111111111',
              description: 'Description 1111111111111111111'
            },
            {
              title: 'Taskkkkkkkkk',
              description: 'Descriptionnnnnnnnnnnnnnnn'
            }
          ]
        },
        {
          name: 'Column 2222222222222222',
          color: 'yellow',
          tasks: [
            {
              title: 'Task 222222222222222',
              description: 'Description 222222222222222'
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
