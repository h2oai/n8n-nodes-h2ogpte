import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';
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
}
