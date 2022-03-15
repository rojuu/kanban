import React from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DeleteIcon from '@mui/icons-material/Delete'
import Task from './Task'
import AddTask from './AddTask'

const Container = styled.div`
    margin: 0.5rem;
    background-color: #ebecf0;
    border-radius: 3px;
    width: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`

const Title = styled.h1`
    display: flex;
    align-items: left;
    margin: 0.1rem 0.1rem 0.3rem 0.1rem;
    padding: 0.5rem  0.5rem  0.5rem  0.5rem;
    width: 70%;
    font-size: 22px;
`

const TaskList = styled.div`
    padding: 0.5rem;
    width: 80%;
`

const DeleteButton = styled.span`
    margin-left: auto;
`

function Column(props) {
    function deleteColumn(columnId, index) {
        const columnTasks = props.board.columns[columnId].taskIds
        const finalTasks = columnTasks.reduce((prev, cur) => {
            const {[cur]: oldTask, ...newTasks} = prev
            return newTasks
        }, props.board.tasks)
        const columns = props.board.columns
        const {[columnId]: oldColumn, ...newColumns} = columns
        const newColumnOrder = Array.from(props.board.columnOrder)
        newColumnOrder.splice(index, 1)
        props.setBoard({
            tasks: {
                ...finalTasks
            },
            columns: {
                ...newColumns,
            },
            columnOrder: newColumnOrder
        })
    }

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>
                        {props.column.title}
                        <DeleteButton onClick={() => deleteColumn(props.column.id, props.index)}><DeleteIcon/></DeleteButton>
                    </Title>
                    <Droppable droppableId={props.column.id} type='task'>
                        {provided => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                                {props.tasks.map((task, index) =>
                                    <Task key={task.id} task={task} index={index} columnId={props.column.id} board={props.board} setBoard={props.setBoard}/>
                                )}
                                {provided.placeholder}
                            <AddTask board={props.board} setBoard={props.setBoard} columnId={props.column.id}/>
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default Column