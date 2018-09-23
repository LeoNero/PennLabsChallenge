const { pipe } = require('ramda')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const User = require('../../models/User')

const {
  formatJoi,
  buildErrors,
  buildSingleError,
} = require('../../helpers/errorBuilder')

const schema = Joi.object().keys({
  id: Joi.objectId().required(),
})

module.exports = (req, res) => {
  const {
    error: joiError,
    value: {
      id,
    },
  } = Joi.validate(req.params, schema, {
    stripUnknown: false,
    abortEarly: false,
  })

  if (joiError) {
    const {
      details: errorDetails,
    } = joiError

    const formattedError = pipe(
      formatJoi,
      buildErrors(req)
    )

    return res.status(400).json(formattedError(errorDetails))
  }

  return User
    .findOne({ _id: id })
    .select('name rankings')
    .populate('rankings')
    .then((user) => {
      if (user) {
        return res.status(200).json(user)
      }

      return res.status(400).json(buildSingleError(req, {
        type: 'not_found',
        parameter_name: 'id',
        message: 'User not found',
      }))
    })
}

