import Link from 'next/link'
import prisma from './db'
import Todo from '@/components/Todo'

function fetchTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  'use server'
  await prisma.todo.update({ where: { id }, data: { complete } })
}
async function handleDelete(id: string) {
  'use server'

  await prisma.todo.delete({ where: { id } })
}

async function handleEdit(id: string, task: string) {
  'use server'

  await prisma.todo.update({ where: { id }, data: { task } })
}
const Home = async () => {
  const todos = await fetchTodos()

  return (
    <div className="flex flex-col items-center gap-4 justify-center mt-12">
      <h1 className="text-4x1">Home</h1>
      <Link href="/new" className="border-2 border-white">
        New Todos
      </Link>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
