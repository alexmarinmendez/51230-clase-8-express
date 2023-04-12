const express = require('express')

const app = express()

app.use(express.json())

let datos = [
    { id: 1, name: 'Backend', teacher: 'Alex Marin Mendez' },
    { id: 2, name: 'ReactJs', teacher: 'Marck Zuckerger' },
    { id: 3, name: 'Angular', teacher: 'Susana Oria' },
]

app.get('/', (request, response) => {
    response.send('<h1 style="color:blue">Hola Coders!!</h1>')
})

app.get('/cursos', (request, response) => {
    const limit = request.query.limit
    response.send({
        message: 'success',
        data: datos.slice(0, limit)
    })
})

app.get('/saludo/:name/:lastname', (request, response) => {
    const name = request.params.name    //URL PARAMS
    const lastname = request.params.lastname    //URL PARAMS
    response.send(`Hola ${name} ${lastname}`)
})

app.get('/alumnos', (request, response) => {
    const id = request.query.id //QUERY PARAMS
    const alumnos = [
        {id: 1, name:'Felipe'},
        {id: 2, name:'Juan'},
        {id: 3, name:'Pepito'},
        {id: 4, name:'Alex'},
    ]
    const result = alumnos.find(item => item.id == id)
    response.send(`Hola ${result.name}`)
})

// app.delete('/cursos/:id', (req, res) => {
//     const id = req.params.id
//     datos = datos.filter(item => item.id !== +id)
//     res.send(datos)
// })

app.delete('/cursos', (req, res) => {
    const id = req.query.id
    datos = datos.filter(item => item.id !== +id)
    res.send(datos)
})

app.post('/cursos', (req, res) => {
    // const curso = { id: 4, name: "Nuevo curso", teacher: "Profe awesome" }
    const curso = req.body
    datos.push(curso)
    res.status(201).send('ok!')
})

app.put('/cursos/:id', (req, res) => {
    const id = req.params.id 
    const nuevosDatos = req.body
    const cursoIndex = datos.findIndex(item => item.id == id)
    datos[cursoIndex] = { ...datos[cursoIndex], ...nuevosDatos }
    res.send('Ok!')
})

app.listen(8080, () => console.log('Server listening'))