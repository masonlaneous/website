import type { FlowThought } from '#shared/types/flow'
import type { Collection, Db } from 'mongodb'
import { getDb } from './mongo'

const flowCache: {
  thoughts: FlowThought[]
  initialized: boolean
} = {
  thoughts: [],
  initialized: false
}
let db: Db
let currentId: number | null = null

export async function initFlowCache() {
  if (flowCache.initialized) return

  db = await getDb()
  const thoughts = await db.collection<FlowThought>('thoughts').find().sort({ createdAt: -1 }).toArray()
  currentId = thoughts.length
  flowCache.thoughts = thoughts
  flowCache.initialized = true

  console.log(`Initialized flow cache with ${thoughts.length} thoughts`)
}

export function getFlowCache(descending = true) {
  const newFlowCache = Array.from(flowCache.thoughts).sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)

  return descending ? newFlowCache.reverse() : newFlowCache
}

export async function addThought(content: string, adminKey: string) {
  if (!currentId) return console.log('invalid id, cant add post')
  if (!process.env.FLOW_ADMIN_KEY || adminKey !== process.env.FLOW_ADMIN_KEY) return console.log('missing or invalid admin key')

  const newThought: FlowThought = {
    id: ++currentId,
    content,
    createdAt: Date.now(),
    likes: 0
  }

  await db.collection('thoughts').insertOne(newThought)
  console.log('Successfully added thought to database with content:', content)

  flowCache.thoughts.push(newThought)
}

export async function addLike(id: number) {
  const target = flowCache.thoughts.find(thought => thought.id === id)
  if (!target) return undefined

  await db.collection<Collection<FlowThought>>('thoughts').updateOne(
    { id: id }, 
    { $inc: { 'likes': 1 } }
  )

  target.likes += 1
}

export async function removeLike(id: number) {
  const target = flowCache.thoughts.find(thought => thought.id === id)
  if (!target) return undefined

  await db.collection<Collection<FlowThought>>('thoughts').updateOne(
    { id: id },
    { $inc: { 'likes': -1 } }
  )

  target.likes -= 1
}

export async function getThought(id: number) {
  const foundThought = flowCache.thoughts.find(thought => thought.id === id)
  console.log(foundThought)
  return foundThought
}

// export function likeThought(thought: flowThought, userId: number, ip: string) {
//   // if thought.likes doesnt have any likes with the userid matching the one supplied, or an ip matching the one supplied, then add a like to thought.likes with that data
// }