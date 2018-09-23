/* eslint no-console: 0 */
/* eslint no-continue: 0 */

// Implement modulo without using the (%) operator.
const modulo = (a, b) => {
  const numberToBeDivided = Math.abs(a)
  const divisor = Math.abs(b)

  if (numberToBeDivided < divisor) {
    return a
  }

  if (numberToBeDivided === divisor) {
    return 0
  }

  if (numberToBeDivided === 0) {
    return 0
  }

  if (divisor === 0) {
    return NaN
  }

  const integerPart = Math.floor(numberToBeDivided / divisor)
  const q = integerPart * divisor

  if (a < 0) {
    return -q
  }

  return q
}

console.log(modulo(2, 2), 2 % 2)
console.log(modulo(-2, -2), -2 % -2, '0 and -0 are the same')
console.log(modulo(-2, 2), -2 % 2, '0 and -0 are the same')
console.log(modulo(2, -2), 2 % -2)

console.log(modulo(5, 2), 5 % 2)
console.log(modulo(5, -2), 5 % -2)
console.log(modulo(-5, -2), -5 % -2)
console.log(modulo(-5, 2), -5 % 2)

console.log(modulo(2, 5), 2 % 5)
console.log(modulo(-2, -5), -2 % -5)
console.log(modulo(-2, 5), -2 % 5)
console.log(modulo(2, -5), 2 % -5)

console.log('\n\n')

// Take an input string and determine if exactly 3 question marks
// exist between every pair of numbers that add up to 10.
// If so, return true, otherwise return false.
const getAnswer = (indicesOfNumbers, string) => {
  const stringAsArray = string.split('')
  let answer = true

  for (let i = 0; i < indicesOfNumbers.length - 1; i += 1) {
    const leftNumber = Number(stringAsArray[indicesOfNumbers[i]])
    const rightNumber = Number(stringAsArray[indicesOfNumbers[i + 1]])

    if (leftNumber + rightNumber === 10) {
      if (indicesOfNumbers[i + 1] - indicesOfNumbers[i] === 4) {
        const getNDigitAfterFirstNumber = n => (
          stringAsArray[indicesOfNumbers[i] + n]
        )

        const firstDigit = getNDigitAfterFirstNumber(1)
        const secondDigit = getNDigitAfterFirstNumber(2)
        const thirdDigit = getNDigitAfterFirstNumber(2)

        if (firstDigit === '?' && secondDigit === '?' && thirdDigit === '?') {
          continue
        } else {
          answer = false
          break
        }
      } else {
        answer = false
        break
      }
    } else {
      continue
    }
  }

  return answer
}

// eslint-disable-next-line
const question_mark = (s) => {
  if (s === '') {
    return false
  }

  const indicesOfNumbers = s
    .split('')
    .reduce((acc, digit, index) => {
      if (!Number.isNaN(Number(digit))) {
        return acc.concat([index])
      }

      return acc
    }, [])

  return getAnswer(indicesOfNumbers, s)
}
