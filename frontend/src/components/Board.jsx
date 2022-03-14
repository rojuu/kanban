import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AddColumn from './AddColumn'
import Column from './Column'
import Logout from './Logout'

const Container = styled.div`
    display: flex;
`
async function fetchBoard(token) {
    const res = await fetch('/board', {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json()
    return data.board
}

async function saveBoard(board, token) {
    /*const response = */await fetch('/board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(board),
    })
}

function Board(props) {
    const initialData = {tasks: {}, columns: {}, columnOrder: []}
    const [board, setBoard] = useState(initialData)
    
    useEffect(() => {
        fetchBoard(props.token).then(data => setBoard(data))
    }, [props.token])

    useEffect(() => {
        saveBoard(board, props.token)
    }, [board, props.token])

    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (!destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        switch (type) {
            case 'column': {
                const newColumnOrder = Array.from(board.columnOrder)
                newColumnOrder.splice(source.index, 1)
                newColumnOrder.splice(destination.index, 0, draggableId)
                setBoard({
                    ...board,
                    columnOrder: newColumnOrder,
                })
                break;
            }
            case 'task': {
                const start = board.columns[source.droppableId]
                const finish = board.columns[destination.droppableId]
    
                if (start === finish) {
                    const newTaskIds = Array.from(start.taskIds)
                    newTaskIds.splice(source.index, 1)
                    newTaskIds.splice(destination.index, 0, draggableId)
    
                    const newColumn = {
                        ...start,
                        taskIds: newTaskIds,
                    }
    
                    setBoard({
                        ...board,
                        columns: {
                            ...board.columns,
                            [newColumn.id]: newColumn,
                        }
                    })
                } else {
                    const newStartTaskIds = Array.from(start.taskIds)
                    newStartTaskIds.splice(source.index, 1)
    
                    const newFinishTaskIds = Array.from(finish.taskIds)
                    newFinishTaskIds.splice(destination.index, 0, draggableId)
    
                    const newStartColumn = {
                        ...start,
                        taskIds: newStartTaskIds,
                    }
                    const newFinishColumn = {
                        ...finish,
                        taskIds: newFinishTaskIds,
                    }
                    setBoard({
                        ...board,
                        columns: {
                            ...board.columns,
                            [newStartColumn.id]: newStartColumn,
                            [newFinishColumn.id]: newFinishColumn,
                        }
                    })
                }
                break;
            }
            default:
                break;
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <AddColumn board={board} setBoard={setBoard} />
            <Logout />
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                {provided => (
                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                        {board.columnOrder.map((columnId, index) => {
                            const column = board.columns[columnId]
                            const tasks = column.taskIds.map(taskId => board.tasks[taskId])
                            return <Column key={column.id} column={column} tasks={tasks} index={index} board={board} setBoard={setBoard} />
                        })}
                    {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board