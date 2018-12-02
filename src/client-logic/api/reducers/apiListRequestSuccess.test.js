import {
	apiListRequestSuccess,
} from 'sls-aws/src/client-logic/api/reducers/apiListRequestSuccess'

describe('apiListRequestSuccess', () => {
	test('sets list errors', () => {
		const reduced = apiListRequestSuccess(
			{},
			{
				listTypeFilterHash: 'mockHash',
				recordType: 'mockRecordType',
				list: {
					next: 'mockNextPageKey',
					items: [
						{ id: 'mockId1', data: 'mockData' },
						{ id: 'mockId2', data: 'mockData' },
					],
				},
			},
		)
		expect(reduced).toEqual({
			api: {
				lists: {
					mockHash: {
						next: 'mockNextPageKey',
						items: [
							'mockRecordType-mockId1',
							'mockRecordType-mockId2',
						],
					},
				},
				records: {
					'mockRecordType-mockId1': {
						id: 'mockId1',
						data: 'mockData',
					},
					'mockRecordType-mockId2': {
						id: 'mockId2',
						data: 'mockData',
					},
				},
			},
		})
	})
})
