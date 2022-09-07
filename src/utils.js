import axios from "axios";

const db_url = 'http://localhost:3000';

function getBoardsPromises() {

    const promises = []
    
    promises.push(
        axios.get(db_url + '/' + 'boards')
        .then(boards => {
            boards.data.forEach(board => {
                promises.push(
                    axios.get(db_url + '/' + 'lists?boardId=' + board.id)
                    .then(lists => {
                        lists.data.forEach(list => {
                            promises.push(
                                axios.get(db_url + '/' + 'tasks?listId=' + list.id)
                                .then(tasks => {
                                    list.tasks = tasks.data
                                })
                                .catch(error => {
                                    console.log('TASKS: ' + error)
                                })
                            )
                        })
                        board.lists = lists.data
                    })
                    .catch(error => {
                        console.log('LISTS: ' + error)
                    })
                )  
            })
            return boards
        })
        .then(boards => {
            return boards.data
        })
        .catch(error => {
            console.log('BOARDS: ' + error)
        }) 
    )
        
    return promises
}

export default { getBoardsPromises }