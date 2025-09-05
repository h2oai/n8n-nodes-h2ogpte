import { ICredentialType, INodeProperties, IAuthenticateGeneric, ICredentialTestRequest } from 'n8n-workflow';
export class h2oGPTeApi implements ICredentialType {
	name = 'h2oGPTeApi';
	displayName = 'h2oGPTe API';
	documentationUrl = 'https://h2oai.github.io/h2ogpte/index.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Bearer Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'h2oGPTe URL',
			name: 'url',
			type: 'string',
			required: true,
			default: 'https://h2ogpte.genai.h2o.ai',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: { headers: { Authorization: '={{"Bearer " + $credentials.token}}' } },
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.url.replace(new RegExp("\/+$"),"") + "/api/v1" }}',
			headers: { 'Content-Type': 'application/json' },
			returnFullResponse: true,
			method: 'GET',
			url: '/users/current/roles',
		},
	};
}

