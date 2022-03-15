import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import DeleteIcon from '@mui/icons-material/DeleteOutline'

const Container = styled.div`
    display: flex;
    border-radius: 2px;
    padding: 0.5rem;
    padding-top: 1rem;
    background-color: #ffffff;
    margin-bottom: 0.5rem;
    width: 90%;
`
const Delete = styled.span`
    margin-left: auto;
`

function Task(props) {
    function deleteTask(columnId, index, taskId) {
        const column = props.board.columns[columnId]
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.splice(index, 1)
        const tasks = props.board.tasks
        const {[taskId]: oldTask, ...newTasks} = tasks
        props.setBoard({
            ...props.board,
            tasks: {
                ...newTasks,
            },
            columns: {
                ...props.board.columns,
                [columnId]: {
                    ...column,
                    taskIds: newTaskIds,
                },
            },
        })
    }

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {props.task.content}
                    <Delete style={{marginLeft:'auto'}} onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> <DeleteIcon /></Delete>
                </Container>
            )}
        </Draggable>
    )
}

export default Task