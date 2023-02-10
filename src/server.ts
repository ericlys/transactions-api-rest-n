import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app.get('/hello2', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running! 🚀')
  })
