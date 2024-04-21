import express from 'express'
import pg from 'pg'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
   const firstBook = await prisma.books.findFirst()
   console.log(firstBook)
}

const app = express()
const client = new pg.Client({
   host: 'localhost',
   user: 'kateandrushko',
   database: 'postgres',
})

app.use(express.json())
app.use(cors())

// client.connect((err) => {
//    if (err) {
//       console.error('Error connecting to database', err)
//    } else {
//       console.log('Connected to database')
//    }
// })

// app.get('/', (req, res) => {
//    res.json('Hi im back lox')
// })

// app.get('/books', (req, res) => {
//    const q = 'SELECT * FROM test.books'
//    client.query(q, (err, data) => {
//       if (err) return res.json(err)
//       return res.json(data.rows)
//    })
// })

// app.post('/books', (req, res) => {
//    const q =
//       'INSERT INTO test.books(title, descript, cover, price) VALUES ($1, $2, $3, $4)'
//    const values = [
//       req.body.title,
//       req.body.descript,
//       req.body.cover,
//       req.body.price,
//    ]
//    client.query(q, values, (err, data) => {
//       if (err) return res.json(err)
//       return res.json('Book has been created successfully')
//    })
// })

// app.delete('/books/:id', (req, res) => {
//    const bookId = req.params.id
//    const q = 'DELETE FROM test.books WHERE id = $1'

//    client.query(q, [bookId], (err, data) => {
//       if (err) return res.json(err)
//       return res.json('Book has been deleted successfully')
//    })
// })

// app.put('/books/:id', (req, res) => {
//    const bookId = req.params.id
//    const q =
//       'UPDATE test.books SET title = $1, descript = $2, cover = $3, price = $4 WHERE id = $5'

//    const values = [
//       req.body.title,
//       req.body.descript,
//       req.body.cover,
//       req.body.price,
//    ]

//    client.query(q, [...values, bookId], (err, data) => {
//       if (err) return res.json(err)
//       return res.json('Book has been updated successfully')
//    })
// })

app.get('/', (req, res) => {
   res.json('Hi im back lox')
})

app.get('/books', async (req, res) => {
   const allBooks = await prisma.books.findMany()
   return res.json(allBooks)
})

app.post('/books', async (req, res) => {
   await prisma.books.create({
      data: {
         title: req.body.title,
         descript: req.body.descript,
         cover: req.body.cover,
         price: Number(req.body.price),
      },
   })

   return res.json('Book has been created successfully')
})

app.delete('/books/:id', async (req, res) => {
   const bookId = req.params.id
   const post = await prisma.books.delete({
      where: { id: Number(bookId) },
   })

   return res.json('Book has been deleted successfully' + post)
})

app.put('/books/:id', async (req, res) => {
   const bookId = req.params.id
   const post = await prisma.books.update({
      where: { id: Number(bookId) },
      data: {
         title: req.body.title,
         descript: req.body.descript,
         cover: req.body.cover,
         price: Number(req.body.price),
      },
   })

   return res.json('Book has been updated successfully' + post)
})

app.listen(8800, () => {
   console.log('Connected to backsczsfds')
})

//TODO: Check
await prisma.$disconnect()
