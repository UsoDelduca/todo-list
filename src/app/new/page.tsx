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
      <form action={handleSubmit} className="mt-12 flex flex-col gap-4">
        <input type="text" name="task" className="border-2" />
        <Link href="/" className="border-2 border-black text-center">
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
