export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  addThought(body.content, body.adminKey)
})