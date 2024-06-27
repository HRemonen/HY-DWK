const errorHandler = (
  error,
  _req,
  res,
  next
) => {
  console.error(`${error.message} ${error.name} ${error.stack}`)

  if (error.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .send({ error: error.message, data: error.errors })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({
      error: error.message,
      data: error.errors,
    })
  }

  return next(error)
}

export default errorHandler