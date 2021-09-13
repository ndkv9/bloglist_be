const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (
    error.name === 'ValidationError' &&
    error.message.includes('expected `username` to be unique')
  ) {
    return response.status(400).json({ error: 'username must be unique' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
