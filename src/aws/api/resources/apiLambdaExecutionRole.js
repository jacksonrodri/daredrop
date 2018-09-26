import { API_LAMBDA_EXECUTION_ROLE } from 'sls-aws/src/aws/api/resourceIds'

export default {
	[API_LAMBDA_EXECUTION_ROLE]: {
		Type: 'AWS::IAM::Role',
		Properties: {
			AssumeRolePolicyDocument: {
				Version: '2012-10-17',
				Statement: [
					{
						Effect: 'Allow',
						Principal: {
							Service: ['lambda.amazonaws.com'],
						},
						Action: ['sts:AssumeRole'],
					},
				],
			},
			Policies: [
				{
					PolicyName: 'root',
					PolicyDocument: {
						Version: '2012-10-17',
						Statement: [
							{
								Effect: 'Allow',
								Action: [
									'dynamodb:DescribeTable',
									'dynamodb:Query',
									'dynamodb:Scan',
									'dynamodb:GetItem',
									'dynamodb:PutItem',
									'dynamodb:UpdateItem',
									'dynamodb:DeleteItem',
								],
								// @TODO: specify the tables from models
								Resource: '*',
							},
						],
					},
				},
			],
		},
	},
}