import Link from 'next/link'
import prisma from '../db'
import { redirect } from 'next/navigation'

async function handleSubmit(data: FormData) {
  'use server'

  const task = data.get('task')?.valueOf()
  if (typeof task !== 'string' || task.length == 0) {
    return new Error('invalid input')
  }
  await prisma.todo.create({ data: { task, complete: false } })
  redirect('/')
}

const New = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex flex-col pt-2">Add new Todo</h1>
      <form action={handleSubmit} className="mt-12 flex flex-col gap-4">
        <input
          type="text"
          name="task"
          className="border-2"
          placeholder="type your new todo here"
        />
        <Link
          href="/"
          className="border-2 border-black text-center text-red-400"
        >
          Cancel
        </Link>
        <button type="submit" className="border-2 border-black">
          Create
        </button>
      </form>
    </div>
  )
}

export default New
