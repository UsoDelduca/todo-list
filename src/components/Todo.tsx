'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  id: string
  task: string
  complete: boolean
  toggleTodo: (id: string, complete: boolean) => void
  handleDelete: (id: string) => void
  handleEdit: (id: string, task: string) => void
}

const Todo = ({
  id,
  task,
  complete,
  toggleTodo,
  handleDelete,
  handleEdit,
}: Props) => {
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')

  const router = useRouter()

  return (
    <li className="flex justify-between mb-4 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer mr-1"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />

      {editing && (
        <>
          <input
            type="text"
            value={input}
            placeholder={task}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="border-2 border-black"
            onClick={() => {
              setEditing(false)
              handleEdit(id, input)
              router.refresh()
            }}
          >
            Save
          </button>
        </>
      )}
      {!editing && (
        <>
          <label
            htmlFor={id}
            className="peer-checked:line-through"
            onDoubleClick={() => setEditing((pre) => !pre)}
          >
            {task}
          </label>

          <button
            className="border border-black ml-3 text-red-400 p-1"
            onClick={() => {
              handleDelete(id)

              router.refresh()
            }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  )
}

export default Todo
