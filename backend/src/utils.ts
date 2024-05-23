const corsHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
};

export const response = (
	{ statusCode, body, headers }: { statusCode: number, body: any, headers?: any }
) => ({
	headers: {
		...corsHeaders,
		...headers
	},
	statusCode,
	body: JSON.stringify(body),
})
