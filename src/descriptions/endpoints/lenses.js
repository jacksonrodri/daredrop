import lensesFromSchema from 'sls-aws/src/util/lensesFromSchema'
import { variableSchemaKey } from 'sls-aws/src/util/commonLenses'


const endpointDescriptionSchema = {
	type: 'object',
	patternProperties: {
		[variableSchemaKey]: { // endpointId
			type: 'object',
			properties: {
				authentication: { type: 'string' },
				endpointType: { type: 'string', enum: ['list', 'record'] },
				recordType: {
					type: 'string',
					enum: [
						'project',
						'projectList',
					],
				},
			},
		},
	},
}

export const endpointDescriptionLenses = lensesFromSchema(
	endpointDescriptionSchema,
)

export const listEndpointType = 'list'
export const recordEndpointType = 'record'