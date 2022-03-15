import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 2px;
    padding: 0.5rem;
    background-color: lightgray;
    margin-bottom: 0.5rem;
    width: 90%;
`
const Input = styled.input`
    width: 100%;
    height: 100%;
    padding: 0;
`


function AddTask(props) {
    const [showNewTaskButton, setShowNewTaskButton] = useState(true)
    const [value, setValue] = useState('')

    const addInput = useRef(null);
    
    useEffect(()=>{
        if (!showNewTaskButton) {
            addInput.current?.focus()
        }
    }, [showNewTaskButton])

    function handleInputComplete(event) {
        event.preventDefault()
        setShowNewTaskButton(true)
        addNewTask(props.columnId, value)
        setValue('')
    }

    function addNewTask(columnId, content) {
        const newTaskId = 'task-' + Math.floor(Math.random() * 10000000)
        const column = props.board.columns[columnId]
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.push(newTaskId)
        const newTask = {
            id: newTaskId,
            content: content,
        }
        props.setBoard({
            ...props.board,
            tasks: {
                ...props.board.tasks,
                [newTaskId]: newTask
            },
            columns: {
                ...props.board.columns,
                [columnId]: {
                    ...props.board.columns[columnId],
                    taskIds: newTaskIds
                }
            }
        })
    }

    return (
        <Container onClick={() => setShowNewTaskButton(false) }>
        {
            showNewTaskButton
                ? <div>ADD NEW TASK</div>
                : (
                <form onSubmit={handleInputComplete}>
                    <Input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onBlur={() => {
                            if (!showNewTaskButton) {
                                setValue('')
                                setShowNewTaskButton(true)
                            }
                        }}
                        ref={addInput}
                    />
                </form>
                )
        }
        </Container>
    )
}

export default AddTask