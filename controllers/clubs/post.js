const Joi = require('joi')
const { pipe } = require('ramda')
const Club = require('../../models/Club')

const { formatJoi, buildErrors } = require('../../helpers/errorBuilder')

const clubJoiSchema = Joi.object().keys({
  name: Joi.string().required(),
  size: Joi.number().integer(),
})

module.exports = (req, res) => {
  const {
    error: joiError,
    value: {
      name,
      size,
    },
  } = Joi.validate(req.body, clubJoiSchema, {
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

  const newClub = new Club({
    name,
    size,
  })

  return newClub.save()
    .then(club => res.status(200).json(club))
}
