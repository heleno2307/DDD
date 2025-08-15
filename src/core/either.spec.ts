import { left, right, type Either } from './either.js'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  }
  return left('Error')
}

test('Success result', () => {
  const successResult = doSomething(true)
  expect(successResult.isRight()).toBe(true)
})

test('error result', () => {
  const errorResult = doSomething(false)
  expect(errorResult.isLeft()).toBe(true)
})
