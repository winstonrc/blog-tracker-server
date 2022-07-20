require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('post-data', function(request) {
	if (request.method === 'POST') {
		return [
			JSON.stringify(request.body)
		].join(' ')
	}
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('dev'))
app.use(morgan(':post-data'))

const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method)
	console.log('Path:   ', request.path)
	console.log('Body:   ', request.body)
	console.log('---')
	next()
}

app.use(requestLogger)

app.get('/info', (request, response) => {
	Person.countDocuments({}, function(error, count) {
		if (error) {
			console.log(error)
		} else {
			let pluralHandler = ''
			if (count === 1) {
				pluralHandler = 'person'
			} else {
				pluralHandler = 'people'
			}

			response.send(
				`<div>
					Phonebook has info for ${count} ${pluralHandler}
					</br>${new Date()}
				</div>`
			)
		}
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

// update number
app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: body.number })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	Person.find({ name : body.name }, function(error, docs) {
		if (docs.length) {
			return response.status(409).json({ error: 'This person is already in the database' })
		} else {
			const person = new Person({
				name: body.name,
				number: body.number || '',
			})

			person.save().then(savedPerson => {
				response.json(savedPerson)
			})
				.catch(error => next(error))
		}
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
