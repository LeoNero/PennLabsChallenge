const mongoose = require('mongoose')
const {
  pipe,
  remove,
  insert,
} = require('ramda')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const Club = require('../../models/Club')
const User = require('../../models/User')

const {
  formatJoi,
  buildErrors,
  buildSingleError,
} = require('../../helpers/errorBuilder')

const schema = Joi.object().keys({
  id: Joi.objectId().required(),
  position: Joi.number().integer().required(),
})

const findClub = id => Club.count({ _id: id })

const verifyIfInRanking = (clubId, rankings) => () => (
  rankings.findIndex(({ _id }) => _id.toString() === clubId)
)

const addElementToRanking = (email, id, position) => (
  User.update({ email }, {
    $push: {
      rankings: {
        $each: [mongoose.Types.ObjectId(id)],
        $position: position,
      },
    },
  })
)

const changePositions = (from, to, array) => {
  const element = array[from]
  const moveElement = pipe(
    remove(from, 1),
    insert(to, element)
  )

  return moveElement(array)
}

module.exports = (req, res) => {
  const {
    user,
  } = req

  const {
    error: joiError,
    value: {
      id,
      position,
    },
  } = Joi.validate(req.body, schema, {
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

  const rankingsLength = user.rankings.length

  return findClub(id)
    .then((count) => {
      if (count > 0) {
        return Promise.resolve()
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        type: 'not_found',
        parameter_name: 'id',
        message: 'Club not found',
      })
    })
    .then(verifyIfInRanking(id, user.rankings))
    .then((indexInRanking) => {
      const invalidPosition = {
        type: 'invalid_paramater',
        parameter_name: 'position',
        message: 'Position is invalid',
      }

      if (indexInRanking === -1) {
        if (position > rankingsLength) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(invalidPosition)
        }

        return addElementToRanking(user.email, id, position)
      }

      if (position > rankingsLength - 1) {
        return Promise.reject(invalidPosition)
      }

      const newRanking = changePositions(
        indexInRanking,
        position,
        user.rankings
      )

      return User.update({ email: user.email }, {
        rankings: newRanking,
      })
    })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(error => res.status(400).json(buildSingleError(req, error)))
}
