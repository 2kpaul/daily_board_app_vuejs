import { uuid } from '@/utils'

export default {
    name: 'daily board',
    columns: [
      {
        name: 'todo',
        tasks: [
          {
            description: 'test description',
            name: 'first task',
            id: uuid(),
            userAssigned: null
          },
          {
            description: '',
            name: 'second task',
            id: uuid(),
            userAssigned: null
          }
        ]
      },
      {
        name: 'in-progress',
        tasks: [
          {
            description: '',
            name: 'first task',
            id: uuid(),
            userAssigned: null
          }
        ]
      },
      {
        name: 'done',
        tasks: [
          {
            description: '',
            name: 'first task',
            id: uuid(),
            userAssigned: null
          }
        ]
      }
    ]
}