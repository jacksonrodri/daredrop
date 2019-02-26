import { dissocPath, compose, set, lensProp, without, view } from 'ramda'
import {
	MANAGE_PAYMENT_FORM_MODULE_ID,
} from 'root/src/shared/descriptions/modules/moduleIds'
import addPaymentMethodPayloadSchema from 'root/src/shared/descriptions/endpoints/schemas/addPaymentMethodPayloadSchema'
import {
	MANAGE_PAYMENT_LIST_ROUTE_ID,
} from 'root/src/shared/descriptions/routes/routeIds'

export default {
	[MANAGE_PAYMENT_FORM_MODULE_ID]: {
		moduleType: 'form',
		formType: 'paymentMethod',
		schema: compose(
			dissocPath(['additionalProperties']),
			set(
				lensProp('required'),
				without(
					[],
					view(lensProp('required'), addPaymentMethodPayloadSchema),
				),
			),
		)(addPaymentMethodPayloadSchema),
		title: 'Payment Information',
		fields: [
			{
				fieldId: 'cardNumber',
				inputType: 'text',
				label: 'Credit Card Number',
				placeholder: '4242 4242 4242 4242',
			},
			{
				fieldId: 'cardName',
				inputType: 'text',
				label: 'Name on Credit Card',
				placeholder: 'Name',
			},
			{
				fieldId: 'expirationDate',
				inputType: 'text',
				label: 'Expiration',
				placeholder: '01/12',
			},
			{
				fieldId: 'securityCode',
				inputType: 'text',
				label: 'Security Code',
				placeholder: '456',
			},
			{
				fieldId: 'zipCode',
				inputType: 'text',
				label: 'Zip Code',
				placeholder: '90210',
			},
		],
		submits: [
			{
				label: 'Confirm',
				buttonType: 'primarySquareButton',
			},
		],
		backButton: {
			label: 'Go Back',
			routeId: MANAGE_PAYMENT_LIST_ROUTE_ID,
		},
	},
}
