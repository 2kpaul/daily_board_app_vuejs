import { uuid } from '@/utils'

export default {
    name: 'daily board',
    columns: [
      {
        name: 'Todo',
        tasks: [
          {
            description: 'test description',
            name: 'fisrt task',
            id: uuid(),
            userAssigned: null
          },
        ]
      },
      {
        name: 'In progress',
        tasks: [
          
        ]
      },
      {
        name: 'Done',
        tasks: [
          
        ]
      }
    ]
}