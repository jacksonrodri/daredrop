import createReducer from 'sls-aws/src/util/createReducer'
import reportError from 'sls-aws/src/util/reportError'

jest.mock('sls-aws/src/util/reportError')

const mockReducers = {
	TEST_ACTION: (state, payload) => payload.test,
	MODIFY_ACTION: (state, payload) => ({
		test: `${state.test} - ${payload.test}`
	})
}

const testInitialState = { test: true }

const reducer = createReducer(mockReducers, testInitialState)

describe('createReducer', () => {
	test('Working normally', () => {
		expect(
			reducer(null, { type: 'TEST_ACTION', payload: { test: 'test' } })
		).toBe('test')
	})

	test('Error reporting', () => {
		expect(
			reducer(undefined, { type: 'BAD_ACTION' })
		).toEqual({ test: true })
		expect(reportError).toBeCalled()
	})

	test('Initial state', () => {
		expect(
			reducer(
				{ test: 'foo' },
				{ type: 'MODIFY_ACTION', payload: { test: 'bar' } }
			)
		).toEqual({ test: 'foo - bar' })
	})
})
