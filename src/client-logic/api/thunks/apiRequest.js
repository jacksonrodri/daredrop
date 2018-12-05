import { equals } from 'ramda'

import invokeLambda from 'sls-aws/src/util/invokeLambda'
import createListStoreKey from 'sls-aws/src/client-logic/api/util/createListStoreKey'
import createRecordStoreKey from 'sls-aws/src/client-logic/api/util/createRecordStoreKey'
import { idProp } from 'sls-aws/src/client-logic/api/lenses'

import initApiListRequest from 'sls-aws/src/client-logic/api/actions/initApiListRequest'
import apiListRequestSuccess from 'sls-aws/src/client-logic/api/actions/apiListRequestSuccess'
import apiListRequestError from 'sls-aws/src/client-logic/api/actions/apiListRequestError'

import initApiRecordRequest from 'sls-aws/src/client-logic/api/actions/initApiRecordRequest'
import apiRecordRequestSuccess from 'sls-aws/src/client-logic/api/actions/apiRecordRequestSuccess'
import apiRecordRequestError from 'sls-aws/src/client-logic/api/actions/apiRecordRequestError'

import recordTypeSelector from 'sls-aws/src/client-logic/api/selectors/recordTypeSelector'
import endpointTypeSelector from 'sls-aws/src/client-logic/api/selectors/endpointTypeSelector'

import { apiFunctionArn } from 'sls-aws/cfOutput'

export const invokeApiLambda = (endpointId, payload) => invokeLambda(
	apiFunctionArn, { endpointId, payload },
)

export const fetchList = async (dispatch, state, endpointId, payload) => {
	const recordType = recordTypeSelector(endpointId)
	const listStoreKey = createListStoreKey(recordType, payload)
	dispatch(initApiListRequest(listStoreKey))
	const lambdaRes = await invokeApiLambda(endpointId, payload)
	const { statusCode, body, statusError, generalError } = lambdaRes
	if (equals(statusCode, 200)) {
		dispatch(apiListRequestSuccess(listStoreKey, recordType, body))
	} else {
		const error = { ...statusError, ...generalError }
		dispatch(apiListRequestError(listStoreKey, error))
	}
	return lambdaRes
}

export const fetchRecord = async (dispatch, state, endpointId, payload) => {
	const recordType = recordTypeSelector(endpointId)
	const recordId = idProp(payload)
	console.log(2, recordType, recordId)
	if (recordId) { // else creating, don't need record loading state
		const recordStoreKey = createRecordStoreKey(recordType, recordId)
		dispatch(initApiRecordRequest(recordStoreKey))
	}
	const lambdaRes = await invokeApiLambda(endpointId, payload)
	console.log(3, lambdaRes)
	const { statusCode, body, statusError, generalError } = lambdaRes
	if (equals(statusCode, 200)) {
		dispatch(apiRecordRequestSuccess(recordType, body))
	} else if (recordId) { // else creating, don't need record error state
		const error = { ...statusError, ...generalError }
		dispatch(apiRecordRequestError(recordType, recordId, error))
	}
	return lambdaRes
}

const endpointTypeFunctionMap = {
	list: fetchList,
	record: fetchRecord,
}

export default (endpointId, payload) => async (dispatch, getState) => {
	try {
		const state = getState()
		const endpointType = endpointTypeSelector(endpointId)
		console.log(1, endpointType)
		return endpointTypeFunctionMap[endpointType](
			dispatch, state, endpointId, payload,
		)
	} catch (e) {
		console.warn(e)
	}
}
