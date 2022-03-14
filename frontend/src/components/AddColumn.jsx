import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    border-radius: 2px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`

const Button = styled.button`
    margin: auto;
`

const Input = styled.input`
    margin: auto;
`

function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true)
    const [value, setValue] = useState('')

    function handleInputComplete(event) {
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
                ? <Button onClick={() => setShowNewColumnButton(false) }>New Column</Button>
                : <Input type='text' value={value} onChange={e => setValue(e.target.value)} onBlur={handleInputComplete} />
        }
        </Container>
    )
}

export default AddColumn