const {
  always,
  pipe,
  curry,
  map,
  applySpec,
  prop,
  path,
} = require('ramda')

exports.formatJoi = pipe(
  map(applySpec({
    type: always('validation'),
    parameter_name: path(['context', 'key']),
    message: prop('message'),
  }))
)

exports.buildErrors = curry(({ originalUrl, originalMethod }, errors) => (
  {
    errors,
    url: originalUrl,
    method: originalMethod,
  }
))

exports.buildSingleError = (req, {
  type,
  parameter_name: parameterName,
  message,
}) => (
  exports.buildErrors(req, [{ type, parameter_name: parameterName, message }])
)
