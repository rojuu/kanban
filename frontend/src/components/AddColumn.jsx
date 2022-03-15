import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 15rem;
    margin: 0.3rem;
    margin-top: 0;
    display: flex;
    flex-direction: column;
`

const Button = styled.div`
    margin-top: 0.5rem;
    padding: 0.7rem;
    background-color: #ebecf0;
    border-radius: 3px;
`

const Input = styled.input`
    width: 12.5rem;
    margin: 0.5rem;
    padding: 0.7rem 0.7rem 0.7rem 0.7rem;
`

function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true)
    const [value, setValue] = useState('')

    const addInput = useRef(null);

    useEffect(()=>{
        if (!showNewColumnButton) {
            addInput.current?.focus()
        }
    }, [showNewColumnButton])

    function handleInputComplete(event) {
        event.preventDefault()
        setShowNewColumnButton(true)
        addNewColumn(value)
        setValue('')
    }

    function addNewColumn(title) {
        const newColumnOrder = Array.from(props.board.columnOrder)
        const newColumnId = 'column-' + Math.floor(Math.random() * 10000000)
        newColumnOrder.push(newColumnId)
        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
        }
        props.setBoard({
            ...props.board,
            columns: {
                ...props.board.columns,
                [newColumnId]: newColumn,
            },
            columnOrder: newColumnOrder
        })
    }

    return (
        <Container>
        {
            showNewColumnButton
                ? <Button onClick={() => setShowNewColumnButton(false)}>NEW COLUMN</Button>
                : (
                <form onSubmit={handleInputComplete}>
                    <Input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onBlur={() => {
                            if (!showNewColumnButton) {
                                setValue('')
                                setShowNewColumnButton(true)
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

export default AddColumn