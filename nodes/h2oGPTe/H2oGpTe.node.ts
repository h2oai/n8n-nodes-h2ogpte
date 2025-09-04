import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
export class H2oGpTe implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'h2oGPTe',
		name: 'h2oGpTe',
		description:
			'# Overview   Users can easily interact with the h2oGPTe API through its REST API, allowing HTTP requests from any progra...',
		version: 1,
		group: ['transform'],
		subtitle: '={{ $parameter["operation"] }}',
		defaults: { name: 'h2oGPTe' },
		icon: "file:h2ogpte.svg",
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		requestDefaults: {
			baseURL: '={{ $credentials.url.replace(new RegExp("\/+$"),"") + "/api/v1" }}',
			headers: { 'Content-Type': 'application/json' },
			returnFullResponse: true,
		},
		credentials: [{ name: 'h2oGPTeApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				default: 'collection',
				options: [
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'API Key',
						value: 'apiKey',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Collection',
						value: 'collection',
					},
					{
						name: 'Configuration',
						value: 'configuration',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Document Ingestion',
						value: 'documentIngestion',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Model',
						value: 'model',
					},
					{
						name: 'Permission',
						value: 'permission',
					},
					{
						name: 'Prompt Template',
						value: 'promptTemplate',
					},
					{
						name: 'System',
						value: 'system',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_collection',
				options: [
					{
						name: 'Archives a Collection Along with Its Associated Data',
						value: 'archive_collection',
						action: 'Archives a collection along with its associated data',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/archive',
							},
						},
					},
					{
						name: 'Counts a Number of Chat Sessions with the Collection',
						value: 'get_chat_session_count_for_collection',
						action: 'Counts a number of chat sessions with the collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/chats/count',
							},
						},
					},
					{
						name: 'Counts a Number of Collections',
						value: 'get_collection_count',
						action: 'Counts a number of collections',
						routing: {
							request: {
								method: 'GET',
								url: '/collections/count',
							},
						},
					},
					{
						name: 'Counts a Number of Documents in the Collection',
						value: 'get_document_count_for_collection',
						action: 'Counts a number of documents in the collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents/count',
							},
						},
					},
					{
						name: 'Create a Collection',
						value: 'create_collection',
						action: 'Create a collection to group related documents',
						routing: {
							request: {
								method: 'POST',
								url: '/collections',
							},
						},
					},
					{
						name: 'Creates a Job to Delete Collection Thumbnail',
						value: 'create_delete_collection_thumbnail_job',
						action: 'Creates a job to delete collection thumbnail image',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/thumbnail/job',
							},
						},
					},
					{
						name: 'Creates a Job to Delete Collections',
						value: 'create_delete_collection_job',
						action: 'Creates a job to delete collections with a given unique identifier',
						routing: {
							request: {
								method: 'POST',
								url: '/collections/delete_job',
							},
						},
					},
					{
						name: 'Creates a Job to Update Collection Thumbnail',
						value: 'create_update_collection_thumbnail_job',
						action: 'Creates a job to update a new thumbnail image for the collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/thumbnail/job',
								headers: {
									'Content-Type': 'multipart/form-data',
								},
							},
						},
					},
					{
						name: 'Creates Job to Import Collection to the Collection',
						value: 'create_import_collection_to_collection_job',
						action: 'Creates job to import collection to the collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/import_collection_job',
							},
						},
					},
					{
						name: 'Creates Job to Insert Document to the Collection',
						value: 'create_insert_document_to_collection_job',
						action: 'Creates job to insert document to the collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents/insert_job',
							},
						},
					},
					{
						name: 'Creates Job to Remove Documents From the Collection',
						value: 'create_delete_document_from_collection_job',
						action: 'Creates job to remove documents from the collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents/delete_job',
							},
						},
					},
					{
						name: 'Deletes Collection',
						value: 'delete_collection',
						action: 'Deletes collection with a given unique identifier',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}',
							},
						},
					},
					{
						name: 'Deletes Collection Thumbnail',
						value: 'delete_collection_thumbnail',
						action: 'Deletes collection thumbnail image',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/thumbnail',
							},
						},
					},
					{
						name: "Fetches All Users' Collection Metadata Sorted by Last Update Time by Default",
						value: 'list_all_collections',
						action:
							'Fetches all users collection metadata sorted by last update time by default this is for admin use only and includes pr',
						routing: {
							request: {
								method: 'GET',
								url: '/collections/all',
							},
						},
					},
					{
						name: 'Fetches Collection Chat Settings',
						value: 'get_collection_chat_settings',
						action: 'Returns details of collection chat settings',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/chat_settings',
							},
						},
					},
					{
						name: 'Fetches Collection Metadata',
						value: 'get_collection_metadata',
						action: 'Returns details of collection metadata',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/metadata',
							},
						},
					},
					{
						name: 'Fetches Collection Settings',
						value: 'get_collection_settings',
						action: 'Returns details of collection settings',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/settings',
							},
						},
					},
					{
						name: 'Finds Chunks Related to a Message Using Lexical Search',
						value: 'search_collection_chunks',
						action:
							'Finds chunks related to a message using lexical search chunks are sorted by relevance and similarity score to the messa',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/chunks/search',
							},
						},
					},
					{
						name: 'Finds Chunks Related to a Message Using Semantic Search',
						value: 'match_collection_chunks',
						action:
							'Finds chunks related to a message using semantic search chunks are sorted by relevance and similarity score to the mess',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/chunks/match',
							},
						},
					},
					{
						name: 'Get a Collection',
						value: 'get_collection',
						action: 'Get a collection by id',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}',
							},
						},
					},
					{
						name: 'Import an Already Stored Document to an Existing Collection',
						value: 'insert_document_into_collection',
						action: 'Import an already stored document to an existing collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents/{document_id}',
							},
						},
					},
					{
						name: "List a Collection's Documents",
						value: 'list_documents_for_collection',
						action: 'List a collection documents',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents',
							},
						},
					},
					{
						name: 'List Chat Sessions for a Given Collection',
						value: 'list_chat_sessions_for_collection',
						action: 'List chat sessions for a given collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/chats',
							},
						},
					},
					{
						name: 'List Collections',
						value: 'list_collections',
						action:
							'List collections for a given user if sort column is not specified the output is sorted by by last update time in desce',
						routing: {
							request: {
								method: 'GET',
								url: '/collections',
							},
						},
					},
					{
						name: 'List Suggested Questions for a Given Collection',
						value: 'list_questions_for_collection',
						action: 'List suggested questions for a given collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/questions',
							},
						},
					},
					{
						name: 'Removes a Prompt Template Reference From the Collection',
						value: 'delete_collection_prompt_template',
						action: 'Removes a prompt template reference from the collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/prompt_template',
							},
						},
					},
					{
						name: 'Removes a Size Limit for a Collection',
						value: 'remove_collection_size_limit',
						action: 'Removes a size limit for a collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/size_limit',
							},
						},
					},
					{
						name: 'Removes an Expiry Date From a Collection',
						value: 'delete_collection_expiry_date',
						action: 'Removes an expiry date from a collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/expiry_date',
							},
						},
					},
					{
						name: 'Removes an Inactivity Interval From the Collection',
						value: 'delete_collection_inactivity_interval',
						action: 'Removes an inactivity interval from the collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/inactivity_interval',
							},
						},
					},
					{
						name: 'Removes Sharing of a Collection to a User',
						value: 'unshare_collection',
						action: 'Removes sharing of a collection to a user',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/permissions/{username}',
							},
						},
					},
					{
						name: 'Removes Sharing of a Collection to All Other Users Except the Original Owner',
						value: 'unshare_collection_for_all',
						action: 'Removes sharing of a collection to all other users except the original owner',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Removes the Document From the Collection',
						value: 'delete_document_from_collection',
						action: 'Removes the document from the collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/documents/{document_id}',
							},
						},
					},
					{
						name: 'Resets the Prompt Settings for a Given Collection',
						value: 'reset_collection_prompt_settings',
						action: 'Resets the prompt settings for a given collection',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/collections/{{ $parameter["collection_id"] }}/prompt_settings',
							},
						},
					},
					{
						name: 'Restores an Archived Collection to an Active Status',
						value: 'unarchive_collection',
						action: 'Restores an archived collection to an active status',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/unarchive',
							},
						},
					},
					{
						name: 'Returns a List of Access Permissions for a Given Collection',
						value: 'get_collection_permissions',
						action: 'The returned list of permissions denotes who has access to the collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Returns a List of Group Access Permissions for a Given Collection',
						value: 'get_collection_group_permissions',
						action:
							'The returned list of group permissions denoting which groups have access to the collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/group_permissions',
							},
						},
					},
					{
						name: 'Returns Specific Chunks in a Collection',
						value: 'get_collection_chunks',
						action: 'Returns specific chunks in a collection',
						routing: {
							request: {
								method: 'GET',
								url: '=/collections/{{ $parameter["collection_id"] }}/chunks/{chunk_ids}',
							},
						},
					},
					{
						name: 'Sets a Maximum Limit on the Total Size of Documents (Sum) Added to a Collection',
						value: 'set_collection_size_limit',
						action:
							'Sets a maximum limit on the total size of documents sum added to a collection the limit is measured in bytes',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/size_limit',
							},
						},
					},
					{
						name: 'Shares a Collection to a Group',
						value: 'share_collection_with_group',
						action:
							'Shares a collection to a group the permission attribute defines the level of access and which group can access the col',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/group_permissions/{group_id}',
							},
						},
					},
					{
						name: 'Shares a Collection to a User',
						value: 'share_collection',
						action: 'Shares a collection template to a user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/permissions/{username}',
							},
						},
					},
					{
						name: 'Updates a Flag Specifying Whether a Collection Is Private or Public',
						value: 'update_collection_privacy',
						action: 'Updates a flag specifying whether a collection is private or public',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/is_public',
							},
						},
					},
					{
						name: 'Updates a Prompt Template Reference of a Collection',
						value: 'update_collection_prompt_template',
						action: 'Updates a prompt template reference of a collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/prompt_template',
							},
						},
					},
					{
						name: 'Updates an Expiry Date of a Collection',
						value: 'update_collection_expiry_date',
						action: 'Updates an expiry date of a collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/expiry_date',
							},
						},
					},
					{
						name: 'Updates an Inactivity Interval of a Collection',
						value: 'update_collection_inactivity_interval',
						action: 'Updates an inactivity interval of a collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/inactivity_interval',
							},
						},
					},
					{
						name: 'Updates Attributes of an Existing Collection',
						value: 'update_collection',
						action: 'Updates of an existing collection particularly name and description',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/collections/{{ $parameter["collection_id"] }}',
							},
						},
					},
					{
						name: 'Updates Collection Chat Settings',
						value: 'update_collection_chat_settings',
						action: 'Recreates entire chat settings on the collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/chat_settings',
							},
						},
					},
					{
						name: 'Updates Collection Metadata',
						value: 'update_collection_metadata',
						action: 'Recreates entire metadata of the collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/metadata',
							},
						},
					},
					{
						name: 'Updates Collection Settings',
						value: 'update_collection_settings',
						action: 'Recreates entire settings on the collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/settings',
							},
						},
					},
					{
						name: 'Updates Collection Thumbnail',
						value: 'update_collection_thumbnail',
						action: 'Uploads a new thumbnail image for the collection',
						routing: {
							request: {
								method: 'PUT',
								url: '=/collections/{{ $parameter["collection_id"] }}/thumbnail',
								headers: {
									'Content-Type': 'multipart/form-data',
								},
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['collection'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_topic_model',
				options: [
					{
						name: 'Creates a Topic Model on the Collection',
						value: 'create_topic_model',
						action: 'Creates a topic model on the collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/topic_model',
							},
						},
					},
					{
						name: 'Creates Job for Creation of a Topic Model',
						value: 'create_topic_model_job',
						action: 'Creates job for creation of a topic model',
						routing: {
							request: {
								method: 'POST',
								url: '/models/create_topic_model_job',
							},
						},
					},
					{
						name: 'Encode Texts for Semantic Searching',
						value: 'encode_chunks_for_retrieval',
						action: 'Encode texts for semantic searching',
						routing: {
							request: {
								method: 'POST',
								url: '=/embedding_models/{{ $parameter["model_id"] }}/encode_chunks_for_retrieval',
							},
						},
					},
					{
						name: 'Extract Information From One or More Contexts Using an LLM',
						value: 'extract_data',
						action:
							'Extract information from one or more contexts using an llm pre prompt extract and prompt extract variables must be',
						routing: {
							request: {
								method: 'POST',
								url: '=/models/{{ $parameter["model_name"] }}/extract_data',
							},
						},
					},
					{
						name: 'Get Mapping of Llm to Its Reasoning_model when ["Auto"] Is Passed as Visible_reasoning_models',
						value: 'get_model_to_reasoning_model_mapping',
						action:
							'Get mapping of llm to its reasoning model when auto is passed as visible reasoning models',
						routing: {
							request: {
								method: 'GET',
								url: '/models/model_to_reasoning_model_mapping',
							},
						},
					},
					{
						name: 'Get Mapping of Llm to Its Vision_model when ["Auto"] Is Passed as Visible_vision_models',
						value: 'get_model_to_vision_model_mapping',
						action:
							'Get mapping of llm to its vision model when auto is passed as visible vision models',
						routing: {
							request: {
								method: 'GET',
								url: '/models/model_to_vision_model_mapping',
							},
						},
					},
					{
						name: 'Gets Default Embedding Model',
						value: 'get_default_embedding_model',
						action: 'Gets default embedding model',
						routing: {
							request: {
								method: 'GET',
								url: '/embedding_models/default',
							},
						},
					},
					{
						name: 'Helper to Get Reasonable (Easy to Use) Defaults for Guardrails/PII Settings',
						value: 'create_guardrails_settings',
						action:
							'Helper to get reasonable easy to use defaults for guardrails pii settings to be further customized',
						routing: {
							request: {
								method: 'POST',
								url: '/guardrails_settings',
							},
						},
					},
					{
						name: 'Lists All Available Embedding Models',
						value: 'list_embedding_models',
						action: 'Lists all available embedding models',
						routing: {
							request: {
								method: 'GET',
								url: '/embedding_models',
							},
						},
					},
					{
						name: 'Lists All Available Large Language Models',
						value: 'list_models',
						action: 'Lists all available large language models',
						routing: {
							request: {
								method: 'GET',
								url: '/models',
							},
						},
					},
					{
						name: 'Lists Names of Available Reasoning-Capable (that Can Natively Reason) in the Environment',
						value: 'get_reasoning_capable_model_names',
						action:
							'Lists names of available reasoning capable that can natively reason in the environment',
						routing: {
							request: {
								method: 'GET',
								url: '/models/reasoning_capable_model_names',
							},
						},
					},
					{
						name: 'Lists Names of Available Vision-Capable Multi-Modal LLMs in the Environment',
						value: 'get_vision_capable_model_names',
						action:
							'Lists names of available vision capable multi modal ll ms that can natively handle images as input in the environment',
						routing: {
							request: {
								method: 'GET',
								url: '/models/vision_capable_model_names',
							},
						},
					},
					{
						name: 'Returns Performance Statistics Grouped by Models',
						value: 'get_performance_stats_by_model',
						action: 'Returns performance statistics grouped by models',
						routing: {
							request: {
								method: 'GET',
								url: '/stats/performance_by_model',
							},
						},
					},
					{
						name: 'Returns Usage Statistics for All Models',
						value: 'get_usage_stats',
						action: 'Returns usage statistics for all models',
						routing: {
							request: {
								method: 'GET',
								url: '/stats/usage',
							},
						},
					},
					{
						name: 'Returns Usage Statistics Grouped by Models',
						value: 'get_usage_stats_by_model',
						action: 'Returns usage statistics grouped by models',
						routing: {
							request: {
								method: 'GET',
								url: '/stats/usage_by_model',
							},
						},
					},
					{
						name: 'Returns Usage Statistics Grouped by Models and Users',
						value: 'get_usage_stats_by_model_and_user',
						action: 'Returns usage statistics grouped by models and users',
						routing: {
							request: {
								method: 'GET',
								url: '/stats/usage_by_model_and_user',
							},
						},
					},
					{
						name: 'Returns Usage Statistics Grouped by Users',
						value: 'get_usage_stats_by_user',
						action: 'Returns usage statistics grouped by users',
						routing: {
							request: {
								method: 'GET',
								url: '/stats/usage_by_user',
							},
						},
					},
					{
						name: 'Runs a Self-Test for a Given Model',
						value: 'run_model_self_test',
						action: 'Runs a self test for a given model',
						routing: {
							request: {
								method: 'POST',
								url: '=/models/{{ $parameter["model_name"] }}/self_test/{mode}',
							},
						},
					},
					{
						name: 'Send a Message and Get a Response From an LLM',
						value: 'answer_question',
						action:
							'Send a message and get a response from an llm note this method is only recommended if you are passing a chat conversat',
						routing: {
							request: {
								method: 'POST',
								url: '=/models/{{ $parameter["model_name"] }}/answer_question',
							},
						},
					},
					{
						name: 'Summarize One or More Contexts Using an LLM',
						value: 'summarize_content',
						action: 'Summarize one or more contexts using an LLM',
						routing: {
							request: {
								method: 'POST',
								url: '=/models/{{ $parameter["model_name"] }}/summarize_content',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['model'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'is_collection_permission_granted',
				options: [
					{
						name: 'Assigns Permission to a Given Role',
						value: 'assign_permission_to_role',
						action: 'Assigns permission to a given role',
						routing: {
							request: {
								method: 'PUT',
								url: '=/roles/{{ $parameter["role_id"] }}/permissions/{permission_name}',
							},
						},
					},
					{
						name: 'Assigns Roles to a Given Group',
						value: 'assign_roles_to_group',
						action: 'Assigns roles to a given user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/groups/{{ $parameter["group_id"] }}/roles/{role_names}',
							},
						},
					},
					{
						name: 'Assigns Roles to a Given User',
						value: 'assign_roles_to_user',
						action: 'Assigns roles to a given user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/users/{{ $parameter["user_id"] }}/roles/{role_names}',
							},
						},
					},
					{
						name: 'Associates a User with a Document They Have Permission On',
						value: 'add_user_document_permission',
						action: 'Associates a user with a document they have permission on',
						routing: {
							request: {
								method: 'PUT',
								url: '=/documents/{{ $parameter["document_id"] }}/users/{user_id}',
							},
						},
					},
					{
						name: 'Checks if Collection Permission Is Granted for a Given User',
						value: 'is_collection_permission_granted',
						action: 'Checks if collection permission is granted for a given user',
						routing: {
							request: {
								method: 'POST',
								url: '=/collections/{{ $parameter["collection_id"] }}/permissions/is_granted',
							},
						},
					},
					{
						name: 'Checks if Permission Is Granted for a Given User',
						value: 'is_permission_granted',
						action: 'Checks if permission is granted for a given user',
						routing: {
							request: {
								method: 'POST',
								url: '/permissions/is_granted',
							},
						},
					},
					{
						name: 'Creates a Role',
						value: 'create_role',
						action: 'Creates a role',
						routing: {
							request: {
								method: 'POST',
								url: '/roles',
							},
						},
					},
					{
						name: 'Creates a User Group',
						value: 'create_group',
						action: 'Creates a user group',
						routing: {
							request: {
								method: 'POST',
								url: '/groups',
							},
						},
					},
					{
						name: 'Deletes Groups for Given Group Names',
						value: 'delete_groups_by_names',
						action: 'Deletes groups for given group names',
						routing: {
							request: {
								method: 'DELETE',
								url: '/groups',
							},
						},
					},
					{
						name: 'Deletes Groups for Given Unique Identifiers',
						value: 'delete_groups',
						action: 'Deletes a groups for given unique identifiers',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/groups/{{ $parameter["group_ids"] }}',
							},
						},
					},
					{
						name: 'Deletes Roles for Given Role Names',
						value: 'delete_roles_by_names',
						action: 'Deletes roles for given role names',
						routing: {
							request: {
								method: 'DELETE',
								url: '/roles',
							},
						},
					},
					{
						name: 'Deletes Roles for Given Unique Identifiers',
						value: 'delete_roles',
						action: 'Deletes roles for given unique identifiers',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/roles/{{ $parameter["role_ids"] }}',
							},
						},
					},
					{
						name: 'Finds Role for a Given Unique Identifier',
						value: 'get_role',
						action: 'Finds role for a given unique identifier',
						routing: {
							request: {
								method: 'GET',
								url: '=/roles/{{ $parameter["role_id"] }}',
							},
						},
					},
					{
						name: 'Finds Roles Associated with a Given Group',
						value: 'get_group_roles',
						action: 'Finds roles associated with a given group',
						routing: {
							request: {
								method: 'GET',
								url: '=/groups/{{ $parameter["group_id"] }}/roles',
							},
						},
					},
					{
						name: 'Finds Roles Associated with a Given User',
						value: 'get_user_roles',
						action: 'Finds roles associated with a given user',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{ $parameter["user_id"] }}/roles',
							},
						},
					},
					{
						name: 'Finds Roles Associated with the User Calling the Endpoint',
						value: 'get_current_user_roles',
						action: 'Finds roles associated with the user calling the endpoint',
						routing: {
							request: {
								method: 'GET',
								url: '/users/current/roles',
							},
						},
					},
					{
						name: 'Finds User for a Given Unique Identifier',
						value: 'get_user',
						action: 'Finds user for a given unique identifier',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{ $parameter["user_id"] }}',
							},
						},
					},
					{
						name: 'Lists Permissions of a Given Group',
						value: 'get_group_permissions',
						action: 'Lists permissions of a given group',
						routing: {
							request: {
								method: 'GET',
								url: '=/group/{{ $parameter["group_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Lists Permissions of a Given Role',
						value: 'get_role_permissions',
						action: 'Lists permissions of a given role',
						routing: {
							request: {
								method: 'GET',
								url: '=/roles/{{ $parameter["role_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Lists Permissions of a Given User',
						value: 'get_user_permissions',
						action: 'Lists permissions of a given user',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{ $parameter["user_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Lists Permissions of the User Calling the Endpoint',
						value: 'get_current_user_permissions',
						action: 'Lists permissions of the user calling the endpoint',
						routing: {
							request: {
								method: 'GET',
								url: '/users/current/permissions',
							},
						},
					},
					{
						name: 'Removes Permission From a Given Role',
						value: 'remove_permission_from_role',
						action: 'Removes permission from a given role',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/roles/{{ $parameter["role_id"] }}/permissions/{permission_name}',
							},
						},
					},
					{
						name: 'Removes Roles From a Given Group',
						value: 'remove_roles_from_group',
						action: 'Removes roles from a given group',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/groups/{{ $parameter["group_id"] }}/roles/{role_names}',
							},
						},
					},
					{
						name: 'Removes Roles From a Given User',
						value: 'remove_roles_from_user',
						action: 'Removes roles from a given user',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/users/{{ $parameter["user_id"] }}/roles/{role_names}',
							},
						},
					},
					{
						name: 'Resets Group Roles',
						value: 'reset_group_roles',
						action: 'Replaces all roles of the given group with a new set of roles',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/groups/{{ $parameter["group_id"] }}/roles',
							},
						},
					},
					{
						name: 'Resets User Roles',
						value: 'reset_user_roles',
						action: 'Replaces all roles of the given user with a new set of roles',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/users/{{ $parameter["user_id"] }}/roles',
							},
						},
					},
					{
						name: 'Returns a List of All Groups Existing on the H2OGPTe Instance',
						value: 'list_groups',
						action: 'Returns a list of all groups existing on the h2 ogp te instance',
						routing: {
							request: {
								method: 'GET',
								url: '/groups',
							},
						},
					},
					{
						name: 'Returns a List of All Registered Users for the System',
						value: 'list_users',
						action: 'Returns a list of all registered users for the system',
						routing: {
							request: {
								method: 'GET',
								url: '/users',
							},
						},
					},
					{
						name: 'Returns All Roles for in the H2OGPTe Instance',
						value: 'list_roles',
						action: 'Returns all roles for in the h2 ogp te instance',
						routing: {
							request: {
								method: 'GET',
								url: '/roles',
							},
						},
					},
					{
						name: 'Returns System Permissions',
						value: 'list_permissions',
						action: 'Returns all system permissions or permissions for given groups',
						routing: {
							request: {
								method: 'GET',
								url: '/permissions',
							},
						},
					},
					{
						name: 'Sets a New Set of Permissions for a Given Role',
						value: 'set_role_permissions',
						action: 'Sets a new set of permissions for a given role',
						routing: {
							request: {
								method: 'POST',
								url: '=/roles/{{ $parameter["role_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Sets Priority for a Given Role',
						value: 'set_role_priority',
						action: 'Sets priority for a given role',
						routing: {
							request: {
								method: 'PUT',
								url: '=/roles/{{ $parameter["role_id"] }}/priority',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['permission'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'list_documents',
				options: [
					{
						name: 'Assigns a Tag to the Document',
						value: 'create_tag_on_document',
						action: 'Assigns a tag to the document',
						routing: {
							request: {
								method: 'POST',
								url: '=/documents/{{ $parameter["document_id"] }}/tags',
							},
						},
					},
					{
						name: 'Counts a Number of Chat Sessions with the Document',
						value: 'get_chat_session_count_for_document',
						action: 'Counts a number of chat sessions with the document',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/chats/count',
							},
						},
					},
					{
						name: 'Counts a Number of Documents',
						value: 'get_document_count',
						action:
							'Counts a number of documents the user has access to if owned parameter is enabled it counts only the documents owned b',
						routing: {
							request: {
								method: 'GET',
								url: '/documents/count',
							},
						},
					},
					{
						name: 'Creates Job to Delete Documents',
						value: 'create_delete_document_job',
						action: 'Creates job to delete documents with a given unique identifier',
						routing: {
							request: {
								method: 'POST',
								url: '/documents/delete_job',
							},
						},
					},
					{
						name: 'Creates Job to Process Document',
						value: 'create_process_document_job',
						action:
							'Processes a document to either create a global or piecewise summary extraction transformation of a document',
						routing: {
							request: {
								method: 'POST',
								url: '/documents/process_job',
							},
						},
					},
					{
						name: 'Deletes a Document',
						value: 'delete_document',
						action: 'Deletes a document with a given unique identifier',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/documents/{{ $parameter["document_id"] }}',
							},
						},
					},
					{
						name: 'Deletes Document Summaries',
						value: 'delete_document_summaries',
						action: 'Deletes document summaries',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/documents/summaries/{{ $parameter["summary_ids"] }}',
							},
						},
					},
					{
						name: 'Fetches Document Guardrails Settings',
						value: 'get_document_guardrails_settings',
						action: 'Returns document guardrails settings',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/guardrails_settings',
							},
						},
					},
					{
						name: 'Fetches Document Internal Metadata',
						value: 'get_document_internal_metadata',
						action: 'Returns document internal metadata',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/internal_metadata',
							},
						},
					},
					{
						name: 'Fetches Document Metadata',
						value: 'get_document_metadata',
						action: 'Returns details of document metadata',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/metadata',
							},
						},
					},
					{
						name: 'Fetches Document Page Layout',
						value: 'get_document_page_layout',
						action: 'Returns document page layout',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/page_layout',
							},
						},
					},
					{
						name: 'Fetches Document Page Ocr Model',
						value: 'get_document_page_ocr_model',
						action: 'Returns document page ocr model',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/page_ocr_model',
							},
						},
					},
					{
						name: 'Fetches Document Summary',
						value: 'get_document_summary',
						action: 'Fetches document summary',
						routing: {
							request: {
								method: 'GET',
								url: '=/document_summaries/{{ $parameter["summary_id"] }}',
							},
						},
					},
					{
						name: 'Fetches Document User Source File',
						value: 'get_document_user_source_file',
						action: 'Returns document user source file',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/user_source_file',
							},
						},
					},
					{
						name: 'Fetches Recent Document Summaries/extractions/transformations',
						value: 'list_document_summaries',
						action: 'Fetches recent document summaries extractions transformations',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/summaries',
							},
						},
					},
					{
						name: 'Finds a Document by ID',
						value: 'get_document',
						action: 'Returns a single document by its unique identifier',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}',
							},
						},
					},
					{
						name: 'List Chat Sessions for a Given Document',
						value: 'list_chat_sessions_for_document',
						action: 'List chat sessions for a given document',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/chats',
							},
						},
					},
					{
						name: 'List Documents',
						value: 'list_documents',
						action:
							'List documents for a given user if sort column is not specified the output is sorted by by last update time in descend',
						routing: {
							request: {
								method: 'GET',
								url: '/documents',
							},
						},
					},
					{
						name: 'Lists Collections for Containing a Given Document',
						value: 'list_collections_for_document',
						action: 'Lists collections for containing a given document',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/collections',
							},
						},
					},
					{
						name: 'Removes a Tag From a Document',
						value: 'delete_tag_from_document',
						action: 'Removes a tag from a document',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/documents/{{ $parameter["document_id"] }}/tags/{tag_name}',
							},
						},
					},
					{
						name: 'Returns All Chunks for a Specific Document',
						value: 'list_document_chunks',
						action: 'Returns all chunks for a specific document',
						routing: {
							request: {
								method: 'GET',
								url: '=/documents/{{ $parameter["document_id"] }}/chunks',
							},
						},
					},
					{
						name: 'Updates Attributes of an Existing Document',
						value: 'update_document',
						action: 'Updates attributes of an existing document particularly name and uri',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/documents/{{ $parameter["document_id"] }}',
							},
						},
					},
					{
						name: 'Updates Document Metadata',
						value: 'update_document_metadata',
						action: 'Recreates entire metadata of the document',
						routing: {
							request: {
								method: 'PUT',
								url: '=/documents/{{ $parameter["document_id"] }}/metadata',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['document'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_prompt_template',
				options: [
					{
						name: 'Counts a Number of Prompt Templates',
						value: 'get_prompt_template_count',
						action: 'Counts a number of prompt templates',
						routing: {
							request: {
								method: 'GET',
								url: '/prompt_templates/count',
							},
						},
					},
					{
						name: 'Creates a New Prompt Template',
						value: 'create_prompt_template',
						action:
							'Creates a new prompt template that can be subsequently associated with a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/prompt_templates',
							},
						},
					},
					{
						name: 'Deletes a Prompt Template',
						value: 'delete_prompt_template',
						action: 'Deletes a prompt template with a given unique identifier',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}',
							},
						},
					},
					{
						name: 'Finds a Prompt Template by ID',
						value: 'get_prompt_template',
						action: 'Returns a single prompt template by its unique identifier',
						routing: {
							request: {
								method: 'GET',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}',
							},
						},
					},
					{
						name: 'List Prompt Templates',
						value: 'list_prompt_templates',
						action: 'List all existing prompt templates',
						routing: {
							request: {
								method: 'GET',
								url: '/prompt_templates',
							},
						},
					},
					{
						name: 'Lists Prompt Templates, Including Hidden Default Templates',
						value: 'list_all_prompt_templates',
						action:
							'Lists prompt templates including hidden default templates only for users who have the permission to manage prompt temp',
						routing: {
							request: {
								method: 'GET',
								url: '/prompt_templates/all',
							},
						},
					},
					{
						name: 'Removes Access to a Prompt Template for a Group',
						value: 'unshare_prompt_template_from_group',
						action: 'Removes access to a prompt template for a group',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/group_permissions/{group_id}',
							},
						},
					},
					{
						name: 'Removes Sharing of a Prompt Template to a User',
						value: 'unshare_prompt_template',
						action: 'Removes sharing of a prompt template to a user',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/permissions/{username}',
							},
						},
					},
					{
						name: 'Removes Sharing of a Prompt Template to All Other Users Except the Original Owner',
						value: 'unshare_prompt_template_for_all',
						action:
							'Removes sharing of a prompt template to all other users except the original owner',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Resets and Shares a Prompt Template to a New List of Groups',
						value: 'reset_and_share_prompt_template_with_groups',
						action: 'Resets and shares a prompt template to a new list of groups',
						routing: {
							request: {
								method: 'PUT',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/group_permissions',
							},
						},
					},
					{
						name: 'Resets and Shares a Prompt Template to a New List of Users',
						value: 'reset_and_share_prompt_template',
						action: 'Resets and shares a prompt template to a new list of users',
						routing: {
							request: {
								method: 'PUT',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Returns a List of Access Permissions for a Given Prompt Template',
						value: 'get_prompt_template_permissions',
						action:
							'The returned list of permissions denotes who has access to the prompt template',
						routing: {
							request: {
								method: 'GET',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/permissions',
							},
						},
					},
					{
						name: 'Returns a List of Group Access Permissions for a Given Prompt Template',
						value: 'get_prompt_template_group_permissions',
						action:
							'The returned list of group permissions denotes which groups have access to the prompt template',
						routing: {
							request: {
								method: 'GET',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/group_permissions',
							},
						},
					},
					{
						name: 'Returns the Default Prompt Template',
						value: 'get_default_prompt_template',
						action: 'Returns the default prompt template',
						routing: {
							request: {
								method: 'GET',
								url: '/prompt_templates/default',
							},
						},
					},
					{
						name: 'Shares a Prompt Template to a User',
						value: 'share_prompt_template',
						action: 'Shares a prompt template to a user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/permissions/{username}',
							},
						},
					},
					{
						name: 'Shares a Prompt Template with a Group',
						value: 'share_prompt_template_with_group',
						action: 'Shares a prompt template with a user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/group_permissions/{group_id}',
							},
						},
					},
					{
						name: 'Updates a Flag Specifying Whether a Default Prompt Template Is Visible or Hidden to Users',
						value: 'update_default_prompt_template_visibility',
						action:
							'Updates a flag specifying whether a default prompt template is visible or hidden to users',
						routing: {
							request: {
								method: 'PUT',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}/is_visible',
							},
						},
					},
					{
						name: 'Updates Attributes of a Given Prompt Template',
						value: 'update_prompt_template',
						action: 'Updates attributes of a given prompt template',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/prompt_templates/{{ $parameter["prompt_template_id"] }}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_tag',
				options: [
					{
						name: 'Creates a New Tag',
						value: 'create_tag',
						action: 'Creates a new tag that can be subsequently associated with a document',
						routing: {
							request: {
								method: 'POST',
								url: '/tags',
							},
						},
					},
					{
						name: 'Finds a Tag by Its Name',
						value: 'get_tag',
						action: 'Returns a single tag by its unique name',
						routing: {
							request: {
								method: 'GET',
								url: '=/tags/{{ $parameter["tag_name"] }}',
							},
						},
					},
					{
						name: 'List Documents Associated with a Tag',
						value: 'list_documents_for_tags',
						action: 'List documents associated with a tag',
						routing: {
							request: {
								method: 'GET',
								url: '=/tags/{{ $parameter["tag_names"] }}/documents',
							},
						},
					},
					{
						name: 'List Tags',
						value: 'list_tags',
						action: 'List all existing tags',
						routing: {
							request: {
								method: 'GET',
								url: '/tags',
							},
						},
					},
					{
						name: 'Updates Attributes of a Tag',
						value: 'update_tag',
						action: 'Updates attributes of an existing tag particularly description and format',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/tags/{{ $parameter["tag_name"] }}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'upload_file',
				options: [
					{
						name: 'Adds Files From the AWS S3 Storage Into a Collection',
						value: 'ingest_from_s3',
						action: 'Adds files from the AWS S3 storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/s3',
							},
						},
					},
					{
						name: 'Adds Files From the Azure Blob Storage Into a Collection',
						value: 'ingest_from_azure_blob_storage',
						action: 'Adds files from the azure blob storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/azure_blob_storage',
							},
						},
					},
					{
						name: 'Adds Files From the Google Cloud Storage Into a Collection',
						value: 'ingest_from_gcs',
						action: 'Adds files from the google cloud storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/gcs',
							},
						},
					},
					{
						name: 'Adds Files From the Local System Into a Collection',
						value: 'ingest_from_file_system',
						action: 'Adds files from the local system into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/file_system',
							},
						},
					},
					{
						name: 'Adds Plain Text to a Collection',
						value: 'ingest_from_plain_text',
						action: 'Adds plain text to a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/plain_text',
								headers: {
									'Content-Type': 'text/plain',
								},
							},
						},
					},
					{
						name: 'Converts Files Uploaded in "Agent_only" Ingest Mode to PDF and Parses Them',
						value: 'ingest_agent_only_to_standard',
						action: 'Converts files uploaded in agent only ingest mode to pdf and parses them',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/agent_only_to_standard',
							},
						},
					},
					{
						name: 'Crawls and Ingest a URL Into a Collection',
						value: 'ingest_from_website',
						action:
							'Crawls and ingest a url into a collection the web page or document linked from this url will be imported',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/website',
							},
						},
					},
					{
						name: 'Creates a Job to Add Files From the AWS S3 Storage Into a Collection',
						value: 'create_ingest_from_s3_job',
						action: 'Creates a job to add files from the AWS S3 storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/s3/job',
							},
						},
					},
					{
						name: 'Creates a Job to Add Files From the Azure Blob Storage Into a Collection',
						value: 'create_ingest_from_azure_blob_storage_job',
						action: 'Creates a job to add files from the azure blob storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/azure_blob_storage/job',
							},
						},
					},
					{
						name: 'Creates a Job to Add Files From the Google Cloud Storage Into a Collection',
						value: 'create_ingest_from_gcs_job',
						action: 'Creates a job to add files from the google cloud storage into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/gcs/job',
							},
						},
					},
					{
						name: 'Creates a Job to Add Files From the Local System Into a Collection',
						value: 'create_ingest_from_file_system_job',
						action: 'Creates a job to add files from the local system into a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/file_system/job',
							},
						},
					},
					{
						name: 'Creates a Job to Add Plain Text to a Collection',
						value: 'create_ingest_from_plain_text_job',
						action: 'Creates a job to add plain text to a collection',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/plain_text/job',
								headers: {
									'Content-Type': 'text/plain',
								},
							},
						},
					},
					{
						name: 'Creates a Job to Crawl and Ingest a URL Into a Collection',
						value: 'create_ingest_from_website_job',
						action:
							'Creates a job to crawl and ingest a url into a collection the web page or document linked from this url will be importe',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/website/job',
							},
						},
					},
					{
						name: 'Creates a Job to Ingest Uploaded Document',
						value: 'create_ingest_upload_job',
						action: 'Creates a job to ingest uploaded document identified to a given collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/uploads/{{ $parameter["upload_ids"] }}/ingest/job',
							},
						},
					},
					{
						name: 'Creates a Job to Parse Files Uploaded in "Agent_only" Ingest Mode',
						value: 'create_ingest_agent_only_to_standard_job',
						action: 'Creates a job to parse files uploaded in agent only ingest mode',
						routing: {
							request: {
								method: 'POST',
								url: '/ingest/agent_only_to_standard/job',
							},
						},
					},
					{
						name: 'Ingest Uploaded Document',
						value: 'ingest_upload',
						action: 'Ingests uploaded document identified to a given collection',
						routing: {
							request: {
								method: 'POST',
								url: '=/uploads/{{ $parameter["upload_ids"] }}/ingest',
							},
						},
					},
					{
						name: 'Uploads File to H2OGPTe Instance',
						value: 'upload_file',
						action: 'Uploads file to h2 ogp te instance',
						routing: {
							request: {
								method: 'PUT',
								url: '/uploads',
								headers: {
									'Content-Type': 'multipart/form-data',
								},
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_chat_session',
				options: [
					{
						name: 'Asks Question in a Given Chat Session. If Stream Is Enabled, the Server Sends Stream of Delta Messages. The Stream Is te...',
						value: 'get_completion',
						action:
							'Asks question in a given chat session if stream is enabled the server sends stream of delta messages the stream is te',
						routing: {
							request: {
								method: 'POST',
								url: '=/chats/{{ $parameter["session_id"] }}/completions',
							},
						},
					},
					{
						name: 'Changes the Vote Value of a Chat Message',
						value: 'set_message_votes',
						action:
							'Set the exact value of a vote for a chat message any message type can be updated but only llm response votes will be v',
						routing: {
							request: {
								method: 'PUT',
								url: '=/messages/{{ $parameter["message_id"] }}/votes',
							},
						},
					},
					{
						name: 'Counts a Number of Chat Sessions',
						value: 'get_chat_session_count',
						action: 'Counts a number of chat sessions',
						routing: {
							request: {
								method: 'GET',
								url: '/chats/count',
							},
						},
					},
					{
						name: 'Counts a Number of Question-Answer Feedbacks',
						value: 'get_question_answer_feedback_count',
						action: 'Counts a number of question answer feedbacks',
						routing: {
							request: {
								method: 'GET',
								url: '/question_answer_feedbacks/count',
							},
						},
					},
					{
						name: 'Creates Chat Session',
						value: 'create_chat_session',
						action:
							'Creates chat session with a collection if provided otherwise the session will be with a generic llm',
						routing: {
							request: {
								method: 'POST',
								url: '/chats',
							},
						},
					},
					{
						name: 'Creates Job to Delete Chat Sessions',
						value: 'create_delete_chat_session_job',
						action: 'Creates job to delete chat sessions',
						routing: {
							request: {
								method: 'POST',
								url: '/chats/delete_job',
							},
						},
					},
					{
						name: 'Deletes Agent Server Directories',
						value: 'delete_agent_server_directories',
						action: 'Deletes agent server directories',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/chats/{{ $parameter["session_ids"] }}/agent_server_directories',
							},
						},
					},
					{
						name: 'Deletes Agent Server Files',
						value: 'delete_agent_server_files',
						action: 'Deletes agent server files',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/chats/{{ $parameter["session_id"] }}/agent_server_files',
							},
						},
					},
					{
						name: 'Deletes Collection',
						value: 'delete_chat_session',
						action: 'Deletes collection with a given unique identifier',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/chats/{{ $parameter["session_id"] }}',
							},
						},
					},
					{
						name: 'Deletes Specific Chat Messages',
						value: 'delete_messages',
						action: 'Deletes specific chat messages',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/messages/{{ $parameter["message_ids"] }}',
							},
						},
					},
					{
						name: 'Fetches Chat Message and Metadata for Messages in a Chat Session',
						value: 'get_chat_session_messages',
						action:
							'Fetches chat message and metadata for messages in a chat session messages without a reply to are from the end user m',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}/messages',
							},
						},
					},
					{
						name: 'Fetches Chat Message Meta Information',
						value: 'get_message_meta',
						action: 'Fetches chat message meta information',
						routing: {
							request: {
								method: 'GET',
								url: '=/messages/{{ $parameter["message_id"] }}/meta',
							},
						},
					},
					{
						name: 'Fetches Metadata for References of a Chat Message',
						value: 'get_message_references',
						action:
							'Fetches metadata for references of a chat message references are only available for messages sent from an llm an empty',
						routing: {
							request: {
								method: 'GET',
								url: '=/messages/{{ $parameter["message_id"] }}/references',
							},
						},
					},
					{
						name: 'Finds a Chat Session by ID',
						value: 'get_chat_session',
						action: 'Returns a single chat session by its unique identifier',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}',
							},
						},
					},
					{
						name: 'Gets Stats of a Agent Server Directory',
						value: 'get_agent_server_directory_stats',
						action: 'Gets stats of a agent server directory',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}/agent_server_directories/{directory_name}/stats',
							},
						},
					},
					{
						name: 'List Chat Sessions',
						value: 'list_chat_sessions',
						action: 'List chat sessions',
						routing: {
							request: {
								method: 'GET',
								url: '/chats',
							},
						},
					},
					{
						name: 'List Suggested Questions for a Given Chat Session',
						value: 'list_questions_for_chat_session',
						action: 'List suggested questions for a given chat session',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}/questions',
							},
						},
					},
					{
						name: 'Lists Agent Server Files',
						value: 'list_agent_server_files',
						action: 'Lists agent server files',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}/agent_server_files',
							},
						},
					},
					{
						name: 'Lists Stats of Agent Server Directories',
						value: 'list_all_agent_server_directories_stats',
						action: 'Lists stats of agent server directories',
						routing: {
							request: {
								method: 'GET',
								url: '=/chats/{{ $parameter["session_id"] }}/agent_server_directories/stats',
							},
						},
					},
					{
						name: "Lists User's Questions and Answers that Have a Feedback",
						value: 'list_question_answer_feedbacks',
						action: 'Lists user s questions and answers that have a feedback',
						routing: {
							request: {
								method: 'GET',
								url: '/question_answer_feedbacks',
							},
						},
					},
					{
						name: 'Removes a Collection Reference From the Chat Session',
						value: 'delete_chat_session_collection',
						action: 'Removes a collection reference from the chat session',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/chats/{{ $parameter["session_id"] }}/collection',
							},
						},
					},
					{
						name: 'Removes a Prompt Template Reference From the Chat Session',
						value: 'delete_chat_session_prompt_template',
						action: 'Removes a prompt template reference from the chat session',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/chats/{{ $parameter["session_id"] }}/prompt_template',
							},
						},
					},
					{
						name: 'Update Feedback for a Specific Answer to a Question',
						value: 'update_question_answer_feedback',
						action: 'Update feedback for a specific answer to a question',
						routing: {
							request: {
								method: 'POST',
								url: '=/question_answer_feedbacks/{{ $parameter["answer_id"] }}',
							},
						},
					},
					{
						name: 'Updates a Collection Reference of a Chat Session',
						value: 'update_chat_session_collection',
						action: 'Updates a collection reference of a chat session',
						routing: {
							request: {
								method: 'PUT',
								url: '=/chats/{{ $parameter["session_id"] }}/collection',
							},
						},
					},
					{
						name: 'Updates a Prompt Template Reference of a Chat Session',
						value: 'update_chat_session_prompt_template',
						action: 'Updates a prompt template reference of a chat session',
						routing: {
							request: {
								method: 'PUT',
								url: '=/chats/{{ $parameter["session_id"] }}/prompt_template',
							},
						},
					},
					{
						name: 'Updates the Name of a Chat Session',
						value: 'update_chat_session',
						action: 'Updates the name of a chat session',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/chats/{{ $parameter["session_id"] }}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'list_jobs',
				options: [
					{
						name: 'Counts the Number of Global, Pending Jobs on the Server',
						value: 'count_pending_jobs',
						action: 'Counts the number of global pending jobs on the server',
						routing: {
							request: {
								method: 'GET',
								url: '/jobs/pending/count',
							},
						},
					},
					{
						name: 'Deletes Job',
						value: 'delete_job',
						action: 'Deletes job with a given unique identifier',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/jobs/{{ $parameter["job_id"] }}',
							},
						},
					},
					{
						name: 'Lists All Jobs Running on the System for All Users',
						value: 'list_user_jobs',
						action: 'Lists all jobs running on the system for all users to be used by admins only',
						routing: {
							request: {
								method: 'GET',
								url: '/user_jobs',
							},
						},
					},
					{
						name: 'Lists Jobs Associated with the User',
						value: 'list_jobs',
						action: 'Lists jobs associated with the user making call',
						routing: {
							request: {
								method: 'GET',
								url: '/jobs',
							},
						},
					},
					{
						name: 'Stops a Specific Job From Running for the User',
						value: 'cancel_job',
						action: 'Stops a specific job from running for the user',
						routing: {
							request: {
								method: 'POST',
								url: '=/jobs/{{ $parameter["job_id"] }}/cancel',
							},
						},
					},
					{
						name: 'Stops a Specific Job From Running on the Server',
						value: 'cancel_user_job',
						action: 'As an admin stops a specific user job from running on the server',
						routing: {
							request: {
								method: 'POST',
								url: '=/user_jobs/{{ $parameter["job_id"] }}/cancel',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['job'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'list_role_configurations',
				options: [
					{
						name: 'Deletes Global Configuration Items',
						value: 'delete_global_configurations',
						action: 'Deletes global configuration items to be used by admins only',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/configurations/{{ $parameter["key_names"] }}',
							},
						},
					},
					{
						name: 'Deletes Role Configuration Items',
						value: 'delete_role_configurations',
						action: 'Deletes role configuration items for a given role',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/roles/{{ $parameter["role_id"] }}/configurations/{key_names}',
							},
						},
					},
					{
						name: 'Deletes User Configuration Items',
						value: 'delete_user_configurations',
						action: 'Deletes user configuration items to be used by admins only',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/users/{{ $parameter["user_id"] }}/configurations/{key_names}',
							},
						},
					},
					{
						name: 'Gets Configurations for a Given Role',
						value: 'list_role_configurations',
						action: 'Gets configurations for a given role',
						routing: {
							request: {
								method: 'GET',
								url: '=/roles/{{ $parameter["role_id"] }}/configurations',
							},
						},
					},
					{
						name: 'Gets Configurations for Current Users',
						value: 'list_current_user_configurations',
						action: 'Gets configurations for current users',
						routing: {
							request: {
								method: 'GET',
								url: '/users/current/configurations',
							},
						},
					},
					{
						name: 'Gets Global Configurations',
						value: 'list_global_configurations',
						action: 'Gets global configurations',
						routing: {
							request: {
								method: 'GET',
								url: '/configurations',
							},
						},
					},
					{
						name: 'Gets User Configurations',
						value: 'list_user_configurations',
						action: 'Gets user configurations to be used by admins only',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{ $parameter["user_id"] }}/configurations',
							},
						},
					},
					{
						name: 'Resets User Configuration Item',
						value: 'reset_user_configuration',
						action: 'Resets user configuration item to be used by admins only',
						routing: {
							request: {
								method: 'POST',
								url: '=/users/{{ $parameter["user_id"] }}/configurations/{key_name}/reset',
							},
						},
					},
					{
						name: 'Sets Configuration Item for a Given Role',
						value: 'set_role_configuration',
						action: 'Sets configuration item for a given role',
						routing: {
							request: {
								method: 'PUT',
								url: '=/roles/{{ $parameter["role_id"] }}/configurations/{key_name}',
							},
						},
					},
					{
						name: 'Sets Global Configuration Item',
						value: 'set_global_configuration',
						action: 'Sets global configuration item to be used by admins only',
						routing: {
							request: {
								method: 'PUT',
								url: '=/configurations/{{ $parameter["key_name"] }}',
							},
						},
					},
					{
						name: 'Sets User Configuration Item',
						value: 'set_user_configuration',
						action: 'Sets user configuration item to be used by admins only',
						routing: {
							request: {
								method: 'PUT',
								url: '=/users/{{ $parameter["user_id"] }}/configurations/{key_name}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['configuration'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create_api_key_for_user',
				options: [
					{
						name: 'Create an API Key',
						value: 'create_api_key_for_user',
						action: 'Allows admins to create an API key for another user',
						routing: {
							request: {
								method: 'POST',
								url: '/admin/api_keys',
							},
						},
					},
					{
						name: 'Deactivate an API Key',
						value: 'deactivate_api_key',
						action: 'Allows admins to deactivate an API key',
						routing: {
							request: {
								method: 'POST',
								url: '=/admin/api_keys/deactivate/{{ $parameter["key_id"] }}',
							},
						},
					},
					{
						name: 'Delete an API Key',
						value: 'delete_api_key',
						action: 'Allows admins to delete an API key',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/admin/api_keys/{{ $parameter["key_id"] }}',
							},
						},
					},
					{
						name: 'List API Keys',
						value: 'list_all_api_keys',
						action: 'Allows admins to list all existing API keys',
						routing: {
							request: {
								method: 'GET',
								url: '/admin/api_keys',
							},
						},
					},
					{
						name: 'Update API Key Expiry',
						value: 'update_api_key_expiry',
						action:
							'Allows admins to update the expiration of an api key either set a new expiry or remove one',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/admin/api_keys/expire/{{ $parameter["key_id"] }}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['apiKey'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'list_agent_directory_stats',
				options: [
					{
						name: 'Creates Agent Key',
						value: 'create_agent_key',
						action: 'Creates agent key',
						routing: {
							request: {
								method: 'POST',
								url: '/agents/keys',
							},
						},
					},
					{
						name: "Creates Associations Between a Tool and User's Keys",
						value: 'create_agent_key_tool_associations',
						action: 'Creates associations between a tool and user s keys',
						routing: {
							request: {
								method: 'POST',
								url: '/agents/tool_association',
							},
						},
					},
					{
						name: 'Creates or Updates the Agent Tool Preference for the User',
						value: 'update_agent_tool_preference',
						action: 'Creates or updates the agent tool preference for the user',
						routing: {
							request: {
								method: 'POST',
								url: '/agents/tool_preference',
							},
						},
					},
					{
						name: 'Deletes Agent Keys',
						value: 'delete_agent_keys',
						action: 'Deletes agent keys',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/agents/keys/{{ $parameter["key_ids"] }}',
							},
						},
					},
					{
						name: 'Deletes Agent Tool Key Associations',
						value: 'delete_agent_tool_association',
						action:
							'Deletes agent tool key associations given a list of associate ids belonging to the user',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/agents/tool_association/{{ $parameter["associate_ids"] }}',
							},
						},
					},
					{
						name: 'Deletes the Agent Tool Preferences for the User',
						value: 'delete_agent_tool_preference',
						action: 'Deletes the agent tool preferences for the user',
						routing: {
							request: {
								method: 'DELETE',
								url: '/agents/tool_preference',
							},
						},
					},
					{
						name: 'Lists Agent Directory Stats Across All Agent Chat Sessions',
						value: 'list_agent_directory_stats',
						action: 'Lists agent directory stats across all agent chat sessions',
						routing: {
							request: {
								method: 'GET',
								url: '/agents/directory_stats',
							},
						},
					},
					{
						name: 'Lists Agent Keys',
						value: 'list_agent_keys',
						action: 'Lists agent keys',
						routing: {
							request: {
								method: 'GET',
								url: '/agents/keys',
							},
						},
					},
					{
						name: 'Lists Agent Tools Present on the System',
						value: 'list_agent_tools',
						action: 'Lists agent tools present on the system',
						routing: {
							request: {
								method: 'GET',
								url: '/agents/tools',
							},
						},
					},
					{
						name: 'Lists the Agent Tool Preference for the User',
						value: 'list_agent_tool_preference',
						action: 'Lists the agent tool preference for the user',
						routing: {
							request: {
								method: 'GET',
								url: '/agents/tool_preference',
							},
						},
					},
					{
						name: "Returns a List of Tools and the User's Associated Keys",
						value: 'list_agent_key_tool_associations',
						action: 'Returns a list of tools and the user s associated keys',
						routing: {
							request: {
								method: 'GET',
								url: '/agents/tool_association',
							},
						},
					},
					{
						name: 'Updates Agent Key',
						value: 'update_agent_key',
						action: 'Updates agent key',
						routing: {
							request: {
								method: 'POST',
								url: '=/agents/keys/{{ $parameter["key_id"] }}',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['agent'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'get_h2ogpt_system_info',
				options: [
					{
						name: 'Gets H2OGPT System Information',
						value: 'get_h2ogpt_system_info',
						action: 'Gets H2OGPT system information',
						routing: {
							request: {
								method: 'GET',
								url: '/system/h2ogpt_info',
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['system'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'e.g. My sci-fi library',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_collection'],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'e.g. Collection of my favourite sci-fi books',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Embedding Model',
						name: 'embedding_model',
						type: 'string',
						default: '',
						placeholder: 'e.g. BAAI/bge-large-en-v1.5',
						routing: {
							send: {
								type: 'body',
								property: 'embedding_model',
							},
						},
					},
					{
						displayName: 'Collection Settings',
						name: 'collection_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'collection_settings',
							},
						},
					},
					{
						displayName: 'Chat Settings',
						name: 'chat_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'chat_settings',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_collections'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Ascending',
						name: 'ascending',
						type: 'boolean',
						default: false,
						description: 'Whether true, returns sorted by sort_column in ascending order',
						routing: {
							send: {
								type: 'query',
								property: 'ascending',
							},
						},
					},
					{
						displayName: 'Current User Only',
						name: 'current_user_only',
						type: 'boolean',
						default: false,
						description: 'Whether true, will only return the user owned collections',
						routing: {
							send: {
								type: 'query',
								property: 'current_user_only',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Metadata Filter',
						name: 'metadata_filter',
						type: 'string',
						default: '',
						description: 'Only returns collections with metadata matching this filter',
						routing: {
							send: {
								type: 'query',
								property: 'metadata_filter',
							},
						},
					},
					{
						displayName: 'Name Filter',
						name: 'name_filter',
						type: 'string',
						default: '',
						description: 'Only returns collections with names matching this filter',
						routing: {
							send: {
								type: 'query',
								property: 'name_filter',
							},
						},
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many collections to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Sort Column',
						name: 'sort_column',
						type: 'options',
						default: 'updated_at',
						options: [
							{
								name: 'Document Count',
								value: 'document_count',
							},
							{
								name: 'Document Size',
								value: 'document_size',
							},
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Sessions Count',
								value: 'sessions_count',
							},
							{
								name: 'Updated At',
								value: 'updated_at',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'sort_column',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_all_collections'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many collections to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Sort Column',
						name: 'sort_column',
						type: 'options',
						default: 'updated_at',
						options: [
							{
								name: 'Archived At',
								value: 'archived_at',
							},
							{
								name: 'Document Count',
								value: 'document_count',
							},
							{
								name: 'Document Size',
								value: 'document_size',
							},
							{
								name: 'Expiry Date',
								value: 'expiry_date',
							},
							{
								name: 'Inactivity Interval',
								value: 'inactivity_interval',
							},
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Sessions Count',
								value: 'sessions_count',
							},
							{
								name: 'Status',
								value: 'status',
							},
							{
								name: 'Updated At',
								value: 'updated_at',
							},
							{
								name: 'Username',
								value: 'username',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'sort_column',
							},
						},
					},
					{
						displayName: 'Ascending',
						name: 'ascending',
						type: 'boolean',
						default: false,
						description: 'Whether true, returns sorted by sort_column in ascending order',
						routing: {
							send: {
								type: 'query',
								property: 'ascending',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of collection to return',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of collection to delete',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of collection to to be updated',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the collection',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the collection',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Rag Type',
						name: 'rag_type',
						type: 'string',
						default: '',
						description:
							'RAG type options: * `auto` - Automatically select the best rag_type. * `llm_only` LLM Only - Answer the query withou...',
						routing: {
							send: {
								type: 'body',
								property: 'rag_type',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to search in',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Chunk IDs',
				name: 'chunk_ids',
				type: 'json',
				default: '={{ {} }}',
				required: true,
				description: 'List of IDs for the chunks to return. Chunks are indexed starting at 1.',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of collection to search within',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['match_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Vectors',
				name: 'vectors',
				type: 'json',
				default: '={{ {} }}',
				required: true,
				description: 'A list of vectorized message for running semantic search',
				routing: {
					send: {
						type: 'body',
						property: 'vectors',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['match_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				required: true,
				description:
					'A list of document_ids used to filter which documents in the collection to search',
				routing: {
					send: {
						type: 'body',
						property: 'topics',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['match_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['match_collection_chunks'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chunks to skip before returning chunks',
						routing: {
							send: {
								type: 'body',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'body',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Cut Off',
						name: 'cut_off',
						type: 'number',
						default: 0,
						description: 'Exclude matches with distances higher than this cut off',
						routing: {
							send: {
								type: 'body',
								property: 'cut_off',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to search within',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['search_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				description: 'Question or imperative from the end user to search a collection for',
				routing: {
					send: {
						type: 'body',
						property: 'query',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['search_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				required: true,
				description:
					'A list of document_ids used to filter which documents in the collection to search',
				routing: {
					send: {
						type: 'body',
						property: 'topics',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['search_collection_chunks'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['search_collection_chunks'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chunks to skip before returning chunks',
						routing: {
							send: {
								type: 'body',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'body',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection IDs',
				name: 'collection_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of collections to be deleted',
				routing: {
					send: {
						type: 'body',
						property: 'collection_ids',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_delete_collection_job'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['create_topic_model'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['create_topic_model'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_prompt_template'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_prompt_template'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Prompt Template ID',
						name: 'prompt_template_id',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_template_id',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection_prompt_template'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_expiry_date'],
					},
				},
			},
			{
				displayName: 'Expiry Date',
				name: 'expiry_date',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'expiry_date',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_expiry_date'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_expiry_date'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: '',
						description:
							'Optional timezone to associate with the expiry date (with IANA timezone support)',
						routing: {
							send: {
								type: 'body',
								property: 'timezone',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection_expiry_date'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_inactivity_interval'],
					},
				},
			},
			{
				displayName: 'Inactivity Interval',
				name: 'inactivity_interval',
				type: 'number',
				default: 0,
				required: true,
				description: 'The inactivity interval as an integer number of days',
				routing: {
					send: {
						type: 'body',
						property: 'inactivity_interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_inactivity_interval'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection_inactivity_interval'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['archive_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unarchive_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['set_collection_size_limit'],
					},
				},
			},
			{
				displayName: 'Size Limit',
				name: 'size_limit',
				type: 'string',
				default: '',
				required: true,
				description: 'The bytes limit',
				placeholder: 'e.g. 12345, 1GB, 1GiB',
				routing: {
					send: {
						type: 'body',
						property: 'size_limit',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['set_collection_size_limit'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['remove_collection_size_limit'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_privacy'],
					},
				},
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Whether a collection is private or public',
				routing: {
					send: {
						type: 'body',
						property: 'is_public',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_privacy'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection associated with the settings',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_settings'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_settings'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_settings'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: '',
						description:
							'Language of audio files. Defaults to "auto" language detection. Pass empty string to see choices',
						routing: {
							send: {
								type: 'body',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'body',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Chunk Overlap Tokens',
						name: 'chunk_overlap_tokens',
						type: 'number',
						default: 0,
						description:
							'Approximate number of tokens that are overlapping between successive chunks',
						routing: {
							send: {
								type: 'body',
								property: 'chunk_overlap_tokens',
							},
						},
					},
					{
						displayName: 'Copy Document',
						name: 'copy_document',
						type: 'boolean',
						default: false,
						description: 'Whether to copy the document when importing an existing document',
						routing: {
							send: {
								type: 'body',
								property: 'copy_document',
							},
						},
					},
					{
						displayName: 'Follow Links',
						name: 'follow_links',
						type: 'boolean',
						default: false,
						description:
							'Whether to import all web pages linked from this URL will be imported. External links will be ignored. Links to other pa...',
						routing: {
							send: {
								type: 'body',
								property: 'follow_links',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'body',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'body',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'body',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'body',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Max Depth',
						name: 'max_depth',
						type: 'number',
						default: 0,
						description:
							"Max depth of recursion when following links, only when follow_links is `true`. Max_depth of 0 means don't follow any lin...",
						routing: {
							send: {
								type: 'body',
								property: 'max_depth',
							},
						},
					},
					{
						displayName: 'Max Documents',
						name: 'max_documents',
						type: 'number',
						default: 0,
						description:
							'Max number of documents when following links, only when follow_links is `true`. Use None for automatic (system defaults)...',
						routing: {
							send: {
								type: 'body',
								property: 'max_documents',
							},
						},
					},
					{
						displayName: 'Max Tokens Per Chunk',
						name: 'max_tokens_per_chunk',
						type: 'number',
						default: 0,
						description:
							'Approximate max. number of tokens per chunk for text-dominated document pages. For images, chunks can be larger',
						routing: {
							send: {
								type: 'body',
								property: 'max_tokens_per_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: '',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. Pass empty ...',
						routing: {
							send: {
								type: 'body',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Root Dir',
						name: 'root_dir',
						type: 'string',
						default: '',
						description: 'Root directory for document storage',
						routing: {
							send: {
								type: 'body',
								property: 'root_dir',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description:
							'Which language to use when using ocr_model="tesseract". Pass empty string to see choices.',
						routing: {
							send: {
								type: 'body',
								property: 'tesseract_lang',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['reset_collection_prompt_settings'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection associated with metadata',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_metadata'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_metadata'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_thumbnail'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_thumbnail'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
					{
						displayName: 'File',
						name: 'file',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'file',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection_thumbnail'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_collection_thumbnail'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_update_collection_thumbnail_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_update_collection_thumbnail_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
					{
						displayName: 'File',
						name: 'file',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'file',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_delete_collection_thumbnail_job'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection associated with the chat settings',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_chat_settings'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_chat_settings'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['update_collection_chat_settings'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Include Chat History',
						name: 'include_chat_history',
						type: 'string',
						default: '',
						description:
							'Whether to include chat history. Includes previous questions and answers for the current chat session for each new chat ...',
						routing: {
							send: {
								type: 'body',
								property: 'include_chat_history',
							},
						},
					},
					{
						displayName: 'Llm',
						name: 'llm',
						type: 'string',
						default: '',
						description:
							'LLM name to send the query. Use "auto" for automatic model routing, set cost_controls of llm_args for detailed control o...',
						routing: {
							send: {
								type: 'body',
								property: 'llm',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Rag Config',
						name: 'rag_config',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map with arguments to control RAG (retrieval-augmented-generation) types.: * `rag_type` **(type=enum[auto, llm_only,',
						routing: {
							send: {
								type: 'body',
								property: 'rag_config',
							},
						},
					},
					{
						displayName: 'Self Reflection Config',
						name: 'self_reflection_config',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map with self reflection settings: * `llm_reflection` **(type=string, example=gpt-4-0613)** * `prompt_reflection`',
						routing: {
							send: {
								type: 'body',
								property: 'self_reflection_config',
							},
						},
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'A list of tags from which to pull the context for RAG',
						routing: {
							send: {
								type: 'body',
								property: 'tags',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description:
					'This parameter refers to the unique identifier ( ID) of the Collection to filter results',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_documents_for_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_documents_for_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description:
							'This parameter refers to the number of documents to skip before retrieving results',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Metadata Filter',
						name: 'metadata_filter',
						type: 'string',
						default: '',
						description: 'String containing metadata JSON dict to filter documents by metadata',
						routing: {
							send: {
								type: 'query',
								property: 'metadata_filter',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to remove the document from',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['insert_document_into_collection'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to be inserted',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['insert_document_into_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['insert_document_into_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Copy Document',
						name: 'copy_document',
						type: 'boolean',
						default: false,
						description: 'Whether to save a new copy of the document',
						routing: {
							send: {
								type: 'query',
								property: 'copy_document',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to remove the document from',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_document_from_collection'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to be removed',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_document_from_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['delete_document_from_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection where the document will be inserted into',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_insert_document_to_collection_job'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to be inserted',
				routing: {
					send: {
						type: 'body',
						property: 'document_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_insert_document_to_collection_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_insert_document_to_collection_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Copy Document',
						name: 'copy_document',
						type: 'boolean',
						default: false,
						description: 'Whether to save a new copy of the document',
						routing: {
							send: {
								type: 'query',
								property: 'copy_document',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to remove the document from',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_delete_document_from_collection_job'],
					},
				},
			},
			{
				displayName: 'Document IDs',
				name: 'document_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of documents to be deleted',
				routing: {
					send: {
						type: 'body',
						property: 'document_ids',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_delete_document_from_collection_job'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to filter by',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_document_count_for_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to filter by',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_chat_sessions_for_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_chat_sessions_for_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chat sessions to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to filter by',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_chat_session_count_for_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to filter by',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_questions_for_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['list_questions_for_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_permissions'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unshare_collection_for_all'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get_collection_group_permissions'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['is_collection_permission_granted'],
					},
				},
			},
			{
				displayName: 'Permission',
				name: 'permission',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'permission',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['is_collection_permission_granted'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection'],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				description: 'User name that will obtain access to the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'Individual permission levels defining the sharing rule',
						routing: {
							send: {
								type: 'body',
								property: 'permissions',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unshare_collection'],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				description: 'User name that will lose access to the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unshare_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection_with_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a group that will obtain access to the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection_with_group'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['share_collection_with_group'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'Individual permission levels defining the sharing rule',
						routing: {
							send: {
								type: 'body',
								property: 'permissions',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unshare_collection_from_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a group that will lose access to the collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['unshare_collection_from_group'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the destination collection',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_import_collection_to_collection_job'],
					},
				},
			},
			{
				displayName: 'Source Collection ID',
				name: 'source_collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection to be inserted',
				routing: {
					send: {
						type: 'body',
						property: 'source_collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_import_collection_to_collection_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create_import_collection_to_collection_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Copy Document',
						name: 'copy_document',
						type: 'boolean',
						default: false,
						description: 'Whether to save a new copy of the document',
						routing: {
							send: {
								type: 'query',
								property: 'copy_document',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_documents'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Ascending',
						name: 'ascending',
						type: 'boolean',
						default: false,
						description: 'Whether true, returns sorted by sort_column in ascending order',
						routing: {
							send: {
								type: 'query',
								property: 'ascending',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Metadata Filter',
						name: 'metadata_filter',
						type: 'string',
						default: '',
						description: 'String containing metadata JSON dict to filter collections by metadata',
						routing: {
							send: {
								type: 'query',
								property: 'metadata_filter',
							},
						},
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many documents to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Sort Column',
						name: 'sort_column',
						type: 'options',
						default: 'updated_at',
						options: [
							{
								name: 'Connector',
								value: 'connector',
							},
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Original Mtime',
								value: 'original_mtime',
							},
							{
								name: 'Original Type',
								value: 'original_type',
							},
							{
								name: 'Page Count',
								value: 'page_count',
							},
							{
								name: 'Size',
								value: 'size',
							},
							{
								name: 'Status',
								value: 'status',
							},
							{
								name: 'Type',
								value: 'type',
							},
							{
								name: 'Updated At',
								value: 'updated_at',
							},
							{
								name: 'Uri',
								value: 'uri',
							},
							{
								name: 'Username',
								value: 'username',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'sort_column',
							},
						},
					},
					{
						displayName: 'With Summaries',
						name: 'with_summaries',
						type: 'boolean',
						default: false,
						description:
							'Whether true, returns also summary and summary_parameter with other common attributes of the document',
						routing: {
							send: {
								type: 'query',
								property: 'with_summaries',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_count'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Owned',
						name: 'owned',
						type: 'boolean',
						default: false,
						description: 'Whether true, it counts only the documents owned by the user',
						routing: {
							send: {
								type: 'query',
								property: 'owned',
							},
						},
					},
				],
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of document to return',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of document to delete',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['delete_document'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['delete_document'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of document to to be updated',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['update_document'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['update_document'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Uri',
						name: 'uri',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'uri',
							},
						},
					},
				],
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_document_chunks'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the collection the document belongs to',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_document_chunks'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the document to create a summary from',
				routing: {
					send: {
						type: 'body',
						property: 'document_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create_process_document_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create_process_document_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Image Batch Final Prompt',
						name: 'image_batch_final_prompt',
						type: 'string',
						default: '',
						description: 'Prompt to reduce all answers each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_final_prompt',
							},
						},
					},
					{
						displayName: 'Image Batch Image Prompt',
						name: 'image_batch_image_prompt',
						type: 'string',
						default: '',
						description: 'Prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_image_prompt',
							},
						},
					},
					{
						displayName: 'Keep Intermediate Results',
						name: 'keep_intermediate_results',
						type: 'boolean',
						default: false,
						description:
							'Whether to keep intermediate results. If false, further LLM calls are applied to the intermediate results until one glob...',
						routing: {
							send: {
								type: 'body',
								property: 'keep_intermediate_results',
							},
						},
					},
					{
						displayName: 'Llm',
						name: 'llm',
						type: 'string',
						default: '',
						description: 'LLM to use',
						routing: {
							send: {
								type: 'body',
								property: 'llm',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Max Num Chunks',
						name: 'max_num_chunks',
						type: 'number',
						default: 0,
						description: 'Max limit of chunks to send to the summarizer',
						routing: {
							send: {
								type: 'body',
								property: 'max_num_chunks',
							},
						},
					},
					{
						displayName: 'Meta Data To Include',
						name: 'meta_data_to_include',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map with flags that indicate whether each piece of document metadata is to be included as part of the context for a c',
						routing: {
							send: {
								type: 'body',
								property: 'meta_data_to_include',
							},
						},
					},
					{
						displayName: 'Pages',
						name: 'pages',
						type: 'json',
						default: '={{ {} }}',
						description:
							'List of specific pages (of the ingested document in PDF form) to use from the document. 1-based indexing.',
						routing: {
							send: {
								type: 'body',
								property: 'pages',
							},
						},
					},
					{
						displayName: 'Pre Prompt Summary',
						name: 'pre_prompt_summary',
						type: 'string',
						default: '',
						description: 'Prompt that goes before each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Prompt Summary',
						name: 'prompt_summary',
						type: 'string',
						default: '',
						description: 'Prompt that goes after each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_summary',
							},
						},
					},
					{
						displayName: 'Sampling Strategy',
						name: 'sampling_strategy',
						type: 'string',
						default: '',
						description:
							'How to sample if the document has more chunks than max_num_chunks. Options are "auto", "uniform", "first", "first+last",...',
						routing: {
							send: {
								type: 'body',
								property: 'sampling_strategy',
							},
						},
					},
					{
						displayName: 'Schema',
						name: 'schema',
						type: 'json',
						default: '={{ {} }}',
						description: 'Optional JSON schema to use for guided JSON generation',
						routing: {
							send: {
								type: 'body',
								property: 'schema',
							},
						},
					},
					{
						displayName: 'Summary ID',
						name: 'summary_id',
						type: 'string',
						default: '',
						description: 'The requested identifier of the output document summary',
						routing: {
							send: {
								type: 'body',
								property: 'summary_id',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description:
							'Amount of time in seconds to allow the request to run. The default is 86400 seconds.',
						routing: {
							send: {
								type: 'body',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Document IDs',
				name: 'document_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of documents to be deleted',
				routing: {
					send: {
						type: 'body',
						property: 'document_ids',
					},
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create_delete_document_job'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_collections_for_document'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_collections_for_document'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many collections to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to to be associated with a tag',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create_tag_on_document'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'e.g. marvel',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create_tag_on_document'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to remove the tag from',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['delete_tag_from_document'],
					},
				},
			},
			{
				displayName: 'Tag Name',
				name: 'tag_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of the tag to be removed',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['delete_tag_from_document'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to filter by',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_chat_sessions_for_document'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_chat_sessions_for_document'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chat sessions to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to filter by',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_chat_session_count_for_document'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document to filter by',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_document_summaries'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['list_document_summaries'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many summaries to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Summary IDs',
				name: 'summary_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'List of string IDs of a document summary to delete from the system',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['delete_document_summaries'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document associated with the metadata',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_metadata'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['update_document_metadata'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_user_source_file'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_page_ocr_model'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_page_layout'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_internal_metadata'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_guardrails_settings'],
					},
				},
			},
			{
				displayName: 'Summary ID',
				name: 'summary_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document summary',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get_document_summary'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the document',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['add_user_document_permission'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The ID of the user that has the permission',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['add_user_document_permission'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['create_prompt_template'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['create_prompt_template'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Auto Gen Description Prompt',
						name: 'auto_gen_description_prompt',
						type: 'string',
						default: '',
						description: 'A prompt to create a description of the collection',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_description_prompt',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Sample Questions Prompt',
						name: 'auto_gen_document_sample_questions_prompt',
						type: 'string',
						default: '',
						description:
							'A prompt to create sample questions for a freshly imported document (if enabled)',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_sample_questions_prompt',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Summary Pre Prompt Summary',
						name: 'auto_gen_document_summary_pre_prompt_summary',
						type: 'string',
						default: '',
						description:
							'A `pre_prompt_summary` for summary of a freshly imported document (if enabled)',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_summary_pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Summary Prompt Summary',
						name: 'auto_gen_document_summary_prompt_summary',
						type: 'string',
						default: '',
						description:
							'A `prompt_summary` for summary of a freshly imported document (if enabled).`',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_summary_prompt_summary',
							},
						},
					},
					{
						displayName: 'Default Sample Questions',
						name: 'default_sample_questions',
						type: 'string',
						default: '',
						description:
							'Default sample questions in case there are no auto-generated sample questions',
						routing: {
							send: {
								type: 'body',
								property: 'default_sample_questions',
							},
						},
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'A description of the prompt template',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Hyde No Rag Llm Prompt Extension',
						name: 'hyde_no_rag_llm_prompt_extension',
						type: 'string',
						default: '',
						description: 'An LLM prompt extension',
						routing: {
							send: {
								type: 'body',
								property: 'hyde_no_rag_llm_prompt_extension',
							},
						},
					},
					{
						displayName: 'Image Batch Final Prompt',
						name: 'image_batch_final_prompt',
						type: 'string',
						default: '',
						description: 'A prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_final_prompt',
							},
						},
					},
					{
						displayName: 'Image Batch Image Prompt',
						name: 'image_batch_image_prompt',
						type: 'string',
						default: '',
						description: 'A prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_image_prompt',
							},
						},
					},
					{
						displayName: 'Lang',
						name: 'lang',
						type: 'string',
						default: '',
						description: 'A language code',
						routing: {
							send: {
								type: 'body',
								property: 'lang',
							},
						},
					},
					{
						displayName: 'Pre Prompt Query',
						name: 'pre_prompt_query',
						type: 'string',
						default: '',
						description: 'A text that is prepended before the contextual document chunks',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_query',
							},
						},
					},
					{
						displayName: 'Pre Prompt Summary',
						name: 'pre_prompt_summary',
						type: 'string',
						default: '',
						description: 'A prompt that goes before each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Prompt Query',
						name: 'prompt_query',
						type: 'string',
						default: '',
						description: "A text that is appended to the beginning of the user's message",
						routing: {
							send: {
								type: 'body',
								property: 'prompt_query',
							},
						},
					},
					{
						displayName: 'Prompt Reflection',
						name: 'prompt_reflection',
						type: 'string',
						default: '',
						description:
							'A template for self-reflection, must contain two occurrences of %s for full previous prompt (including system prompt, do',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_reflection',
							},
						},
					},
					{
						displayName: 'Prompt Summary',
						name: 'prompt_summary',
						type: 'string',
						default: '',
						description: 'A prompt that goes after each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_summary',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description: 'A system prompt',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'System Prompt Reflection',
						name: 'system_prompt_reflection',
						type: 'string',
						default: '',
						description: 'A system prompt for self-reflection',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt_reflection',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['list_prompt_templates'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Ascending',
						name: 'ascending',
						type: 'boolean',
						default: true,
						description: 'Whether true, returns sorted by sort_column in ascending order',
						routing: {
							send: {
								type: 'query',
								property: 'ascending',
							},
						},
					},
					{
						displayName: 'Filter',
						name: 'filter',
						type: 'string',
						default: '',
						description: 'When set, will be used as a filter on some prompt template columns',
						routing: {
							send: {
								type: 'query',
								property: 'filter',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many prompt templates to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Sort Column',
						name: 'sort_column',
						type: 'options',
						default: 'updated_at',
						options: [
							{
								name: 'Description',
								value: 'description',
							},
							{
								name: 'Is Default',
								value: 'is_default',
							},
							{
								name: 'Lang',
								value: 'lang',
							},
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Updated At',
								value: 'updated_at',
							},
							{
								name: 'User Count',
								value: 'user_count',
							},
							{
								name: 'Username',
								value: 'username',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'sort_column',
							},
						},
					},
					{
						displayName: 'Template Type',
						name: 'template_type',
						type: 'options',
						default: 'all',
						description: 'When set, will be used as a type filter',
						options: [
							{
								name: 'All',
								value: 'all',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'System',
								value: 'system',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'template_type',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['list_all_prompt_templates'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Ascending',
						name: 'ascending',
						type: 'boolean',
						default: true,
						description: 'Whether true, returns sorted by sort_column in ascending order',
						routing: {
							send: {
								type: 'query',
								property: 'ascending',
							},
						},
					},
					{
						displayName: 'Filter',
						name: 'filter',
						type: 'string',
						default: '',
						description: 'When set, will be used as a filter on some prompt template columns',
						routing: {
							send: {
								type: 'query',
								property: 'filter',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many prompt templates to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Sort Column',
						name: 'sort_column',
						type: 'options',
						default: 'updated_at',
						options: [
							{
								name: 'Description',
								value: 'description',
							},
							{
								name: 'Is Default',
								value: 'is_default',
							},
							{
								name: 'Lang',
								value: 'lang',
							},
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Updated At',
								value: 'updated_at',
							},
							{
								name: 'User Count',
								value: 'user_count',
							},
							{
								name: 'Username',
								value: 'username',
							},
							{
								name: 'Visible',
								value: 'visible',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'sort_column',
							},
						},
					},
					{
						displayName: 'Template Type',
						name: 'template_type',
						type: 'options',
						default: 'all',
						description: 'When set, will be used as a type filter',
						options: [
							{
								name: 'All',
								value: 'all',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'System',
								value: 'system',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'template_type',
							},
						},
					},
				],
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template to return',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['get_prompt_template'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template to update',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['update_prompt_template'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['update_prompt_template'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Auto Gen Description Prompt',
						name: 'auto_gen_description_prompt',
						type: 'string',
						default: '',
						description: 'A prompt to create a description of the collection',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_description_prompt',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Sample Questions Prompt',
						name: 'auto_gen_document_sample_questions_prompt',
						type: 'string',
						default: '',
						description:
							'A prompt to create sample questions for a freshly imported document (if enabled)',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_sample_questions_prompt',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Summary Pre Prompt Summary',
						name: 'auto_gen_document_summary_pre_prompt_summary',
						type: 'string',
						default: '',
						description:
							'A `pre_prompt_summary` for summary of a freshly imported document (if enabled)',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_summary_pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Auto Gen Document Summary Prompt Summary',
						name: 'auto_gen_document_summary_prompt_summary',
						type: 'string',
						default: '',
						description:
							'A `prompt_summary` for summary of a freshly imported document (if enabled).`',
						routing: {
							send: {
								type: 'body',
								property: 'auto_gen_document_summary_prompt_summary',
							},
						},
					},
					{
						displayName: 'Default Sample Questions',
						name: 'default_sample_questions',
						type: 'string',
						default: '',
						description:
							'Default sample questions in case there are no auto-generated sample questions',
						routing: {
							send: {
								type: 'body',
								property: 'default_sample_questions',
							},
						},
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'A description of the prompt template',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Hyde No Rag Llm Prompt Extension',
						name: 'hyde_no_rag_llm_prompt_extension',
						type: 'string',
						default: '',
						description: 'An LLM prompt extension',
						routing: {
							send: {
								type: 'body',
								property: 'hyde_no_rag_llm_prompt_extension',
							},
						},
					},
					{
						displayName: 'Image Batch Final Prompt',
						name: 'image_batch_final_prompt',
						type: 'string',
						default: '',
						description: 'A prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_final_prompt',
							},
						},
					},
					{
						displayName: 'Image Batch Image Prompt',
						name: 'image_batch_image_prompt',
						type: 'string',
						default: '',
						description: 'A prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_image_prompt',
							},
						},
					},
					{
						displayName: 'Lang',
						name: 'lang',
						type: 'string',
						default: '',
						description: 'A language code',
						routing: {
							send: {
								type: 'body',
								property: 'lang',
							},
						},
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'A name of the prompt template',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Pre Prompt Query',
						name: 'pre_prompt_query',
						type: 'string',
						default: '',
						description: 'A text that is prepended before the contextual document chunks',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_query',
							},
						},
					},
					{
						displayName: 'Pre Prompt Summary',
						name: 'pre_prompt_summary',
						type: 'string',
						default: '',
						description: 'A prompt that goes before each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Prompt Query',
						name: 'prompt_query',
						type: 'string',
						default: '',
						description: "A text that is appended to the beginning of the user's message",
						routing: {
							send: {
								type: 'body',
								property: 'prompt_query',
							},
						},
					},
					{
						displayName: 'Prompt Reflection',
						name: 'prompt_reflection',
						type: 'string',
						default: '',
						description:
							'A template for self-reflection, must contain two occurrences of %s for full previous prompt (including system prompt, do',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_reflection',
							},
						},
					},
					{
						displayName: 'Prompt Summary',
						name: 'prompt_summary',
						type: 'string',
						default: '',
						description: 'A prompt that goes after each large piece of text to summarize',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_summary',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description: 'A system prompt',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'System Prompt Reflection',
						name: 'system_prompt_reflection',
						type: 'string',
						default: '',
						description: 'A system prompt for self-reflection',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt_reflection',
							},
						},
					},
				],
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template to delete',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['delete_prompt_template'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['get_prompt_template_permissions'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['reset_and_share_prompt_template'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['reset_and_share_prompt_template'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Usernames',
						name: 'usernames',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'usernames',
							},
						},
					},
				],
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['unshare_prompt_template_for_all'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['share_prompt_template'],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				description: 'User name that will obtain access to the prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['share_prompt_template'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['unshare_prompt_template'],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				description: 'User name that will lose access to the prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['unshare_prompt_template'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['get_prompt_template_group_permissions'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['reset_and_share_prompt_template_with_groups'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['reset_and_share_prompt_template_with_groups'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Groups',
						name: 'groups',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'groups',
							},
						},
					},
				],
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['share_prompt_template_with_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the group that will obtain access to the prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['share_prompt_template_with_group'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['unshare_prompt_template_from_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the group that will lose access to the prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['unshare_prompt_template_from_group'],
					},
				},
			},
			{
				displayName: 'Prompt Template ID',
				name: 'prompt_template_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a prompt template',
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['update_default_prompt_template_visibility'],
					},
				},
			},
			{
				displayName: 'Is Visible',
				name: 'is_visible',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Whether the default prompt template should be visible or not',
				routing: {
					send: {
						type: 'body',
						property: 'is_visible',
					},
				},
				displayOptions: {
					show: {
						resource: ['promptTemplate'],
						operation: ['update_default_prompt_template_visibility'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'e.g. marvel',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create_tag'],
					},
				},
			},
			{
				displayName: 'Tag Name',
				name: 'tag_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of a tag to return',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['get_tag'],
					},
				},
			},
			{
				displayName: 'Tag Name',
				name: 'tag_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of a tag to to be updated',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['update_tag'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['update_tag'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Format',
						name: 'format',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'format',
							},
						},
					},
				],
			},
			{
				displayName: 'Tag Names',
				name: 'tag_names',
				type: 'string',
				default: '',
				required: true,
				description: 'Names of a tags to return documents for',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['list_documents_for_tags'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a collection containing the documents',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['list_documents_for_tags'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['upload_file'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'File',
						name: 'file',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'file',
							},
						},
					},
				],
			},
			{
				displayName: 'Upload IDs',
				name: 'upload_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of uploaded document',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_upload'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_upload'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_upload'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'The list of usernames having permissions to the document',
						routing: {
							send: {
								type: 'query',
								property: 'permissions',
							},
						},
					},
					{
						displayName: 'Restricted',
						name: 'restricted',
						type: 'boolean',
						default: false,
						description: 'Whether the document should be restricted only to certain users',
						routing: {
							send: {
								type: 'query',
								property: 'restricted',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Upload IDs',
				name: 'upload_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of uploaded document',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_upload_job'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_upload_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_upload_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'The list of usernames having permissions to the document',
						routing: {
							send: {
								type: 'query',
								property: 'permissions',
							},
						},
					},
					{
						displayName: 'Restricted',
						name: 'restricted',
						type: 'boolean',
						default: false,
						description: 'Whether the document should be restricted only to certain users',
						routing: {
							send: {
								type: 'query',
								property: 'restricted',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_file_system'],
					},
				},
			},
			{
				displayName: 'Root Dir',
				name: 'root_dir',
				type: 'string',
				default: '',
				required: true,
				description: 'String path of where to look for files',
				routing: {
					send: {
						type: 'body',
						property: 'root_dir',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_file_system'],
					},
				},
			},
			{
				displayName: 'Glob',
				name: 'glob',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the glob pattern used to match files in the root directory',
				routing: {
					send: {
						type: 'body',
						property: 'glob',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_file_system'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_file_system'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_file_system_job'],
					},
				},
			},
			{
				displayName: 'Root Dir',
				name: 'root_dir',
				type: 'string',
				default: '',
				required: true,
				description: 'String path of where to look for files',
				routing: {
					send: {
						type: 'body',
						property: 'root_dir',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_file_system_job'],
					},
				},
			},
			{
				displayName: 'Glob',
				name: 'glob',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the glob pattern used to match files in the root directory',
				routing: {
					send: {
						type: 'body',
						property: 'glob',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_file_system_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_file_system_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_plain_text'],
					},
				},
			},
			{
				displayName: 'File Name',
				name: 'file_name',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the file name to use for the document',
				routing: {
					send: {
						type: 'query',
						property: 'file_name',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_plain_text'],
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				required: true,
				description: 'The text that will ingested into a collection',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_plain_text'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_plain_text'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'string',
						default: '',
						description: 'String with JSON-encoded metadata for the document',
						routing: {
							send: {
								type: 'query',
								property: 'metadata',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_plain_text_job'],
					},
				},
			},
			{
				displayName: 'File Name',
				name: 'file_name',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the file name to use for the document',
				routing: {
					send: {
						type: 'query',
						property: 'file_name',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_plain_text_job'],
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				required: true,
				description: 'The text that will ingested into a collection',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_plain_text_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_plain_text_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'string',
						default: '',
						description: 'String with JSON-encoded metadata for the document',
						routing: {
							send: {
								type: 'query',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_website'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the URL to crawl',
				routing: {
					send: {
						type: 'body',
						property: 'url',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_website'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_website'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Follow Links',
						name: 'follow_links',
						type: 'boolean',
						default: false,
						description:
							'Whether to import all web pages linked from this URL will be imported. External links will be ignored. Links to other pa...',
						routing: {
							send: {
								type: 'query',
								property: 'follow_links',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Max Depth',
						name: 'max_depth',
						type: 'number',
						default: -1,
						description:
							"Max depth of recursion when following links, only when follow_links is `true`. Max_depth of 0 means don't follow any lin...",
						routing: {
							send: {
								type: 'query',
								property: 'max_depth',
							},
						},
					},
					{
						displayName: 'Max Documents',
						name: 'max_documents',
						type: 'number',
						default: 0,
						description:
							'Max number of documents when following links, only when follow_links is `true`. Use None for automatic (system defaults)...',
						routing: {
							send: {
								type: 'query',
								property: 'max_documents',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_website_job'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				description: 'String of the URL to crawl',
				routing: {
					send: {
						type: 'body',
						property: 'url',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_website_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_website_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Follow Links',
						name: 'follow_links',
						type: 'boolean',
						default: false,
						description:
							'Whether to import all web pages linked from this URL will be imported. External links will be ignored. Links to other pa...',
						routing: {
							send: {
								type: 'query',
								property: 'follow_links',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Max Depth',
						name: 'max_depth',
						type: 'number',
						default: -1,
						description:
							"Max depth of recursion when following links, only when follow_links is `true`. Max_depth of 0 means don't follow any lin...",
						routing: {
							send: {
								type: 'query',
								property: 'max_depth',
							},
						},
					},
					{
						displayName: 'Max Documents',
						name: 'max_documents',
						type: 'number',
						default: 0,
						description:
							'Max number of documents when following links, only when follow_links is `true`. Use None for automatic (system defaults)...',
						routing: {
							send: {
								type: 'query',
								property: 'max_documents',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_agent_only_to_standard'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the document to be parsed',
				routing: {
					send: {
						type: 'query',
						property: 'document_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_agent_only_to_standard'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_agent_only_to_standard'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'The list of usernames having permissions to the document',
						routing: {
							send: {
								type: 'query',
								property: 'permissions',
							},
						},
					},
					{
						displayName: 'Restricted',
						name: 'restricted',
						type: 'boolean',
						default: false,
						description: 'Whether the document should be restricted only to certain users',
						routing: {
							send: {
								type: 'query',
								property: 'restricted',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_agent_only_to_standard_job'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the document to be parsed',
				routing: {
					send: {
						type: 'query',
						property: 'document_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_agent_only_to_standard_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_agent_only_to_standard_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Permissions',
						name: 'permissions',
						type: 'string',
						default: '',
						description: 'The list of usernames having permissions to the document',
						routing: {
							send: {
								type: 'query',
								property: 'permissions',
							},
						},
					},
					{
						displayName: 'Restricted',
						name: 'restricted',
						type: 'boolean',
						default: false,
						description: 'Whether the document should be restricted only to certain users',
						routing: {
							send: {
								type: 'query',
								property: 'restricted',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_s3'],
					},
				},
			},
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				required: true,
				description: 'The path or list of paths of S3 files or directories',
				routing: {
					send: {
						type: 'body',
						property: 'urls',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_s3'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_s3'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object with S3 credentials. If the object is not provided, only public buckets will be accessible.',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the documents',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Region',
						name: 'region',
						type: 'string',
						default: '',
						description: 'The name of the region used for interaction with AWS services',
						routing: {
							send: {
								type: 'body',
								property: 'region',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_s3_job'],
					},
				},
			},
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				required: true,
				description: 'The path or list of paths of S3 files or directories',
				routing: {
					send: {
						type: 'body',
						property: 'urls',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_s3_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_s3_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object with S3 credentials. If the object is not provided, only public buckets will be accessible.',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the documents',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Region',
						name: 'region',
						type: 'string',
						default: '',
						description: 'The name of the region used for interaction with AWS services',
						routing: {
							send: {
								type: 'body',
								property: 'region',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_gcs'],
					},
				},
			},
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				required: true,
				description: 'The path or list of paths of GCS files or directories',
				routing: {
					send: {
						type: 'body',
						property: 'urls',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_gcs'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_gcs'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object holding JSON key of Google Cloud service account. If the object is not provided, only public buckets will be...',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_gcs_job'],
					},
				},
			},
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				required: true,
				description: 'The path or list of paths of GCS files or directories',
				routing: {
					send: {
						type: 'body',
						property: 'urls',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_gcs_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_gcs_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object holding JSON key of Google Cloud service account. If the object is not provided, only public buckets will be...',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_azure_blob_storage'],
					},
				},
			},
			{
				displayName: 'Container',
				name: 'container',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of the Azure Blob Storage container',
				routing: {
					send: {
						type: 'body',
						property: 'container',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_azure_blob_storage'],
					},
				},
			},
			{
				displayName: 'Paths',
				name: 'paths',
				type: 'string',
				default: '',
				required: true,
				description:
					'Path or list of paths to files or directories within an Azure Blob Storage container',
				routing: {
					send: {
						type: 'body',
						property: 'paths',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_azure_blob_storage'],
					},
				},
			},
			{
				displayName: 'Account Name',
				name: 'account_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of a storage account',
				routing: {
					send: {
						type: 'body',
						property: 'account_name',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_azure_blob_storage'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['ingest_from_azure_blob_storage'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object with Azure credentials. If container is private, set either `account_key` or `sas_token`.',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				description: 'String ID of the collection to add the ingested documents into',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_azure_blob_storage_job'],
					},
				},
			},
			{
				displayName: 'Container',
				name: 'container',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of the Azure Blob Storage container',
				routing: {
					send: {
						type: 'body',
						property: 'container',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_azure_blob_storage_job'],
					},
				},
			},
			{
				displayName: 'Paths',
				name: 'paths',
				type: 'string',
				default: '',
				required: true,
				description:
					'Path or list of paths to files or directories within an Azure Blob Storage container',
				routing: {
					send: {
						type: 'body',
						property: 'paths',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_azure_blob_storage_job'],
					},
				},
			},
			{
				displayName: 'Account Name',
				name: 'account_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of a storage account',
				routing: {
					send: {
						type: 'body',
						property: 'account_name',
					},
				},
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_azure_blob_storage_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['documentIngestion'],
						operation: ['create_ingest_from_azure_blob_storage_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Audio Input Language',
						name: 'audio_input_language',
						type: 'string',
						default: 'auto',
						description: 'Language of audio files',
						routing: {
							send: {
								type: 'query',
								property: 'audio_input_language',
							},
						},
					},
					{
						displayName: 'Chunk By Page',
						name: 'chunk_by_page',
						type: 'boolean',
						default: false,
						description:
							'Whether each page will be a chunk. `keep_tables_as_one_chunk` will be ignored if this is `true`.',
						routing: {
							send: {
								type: 'query',
								property: 'chunk_by_page',
							},
						},
					},
					{
						displayName: 'Credentials',
						name: 'credentials',
						type: 'json',
						default: '={{ {} }}',
						description:
							'The object with Azure credentials. If container is private, set either `account_key` or `sas_token`.',
						routing: {
							send: {
								type: 'body',
								property: 'credentials',
							},
						},
					},
					{
						displayName: 'Gen Doc Questions',
						name: 'gen_doc_questions',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate sample questions for each document (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_questions',
							},
						},
					},
					{
						displayName: 'Gen Doc Summaries',
						name: 'gen_doc_summaries',
						type: 'boolean',
						default: false,
						description: 'Whether to auto-generate document summaries (uses LLM)',
						routing: {
							send: {
								type: 'query',
								property: 'gen_doc_summaries',
							},
						},
					},
					{
						displayName: 'Handwriting Check',
						name: 'handwriting_check',
						type: 'boolean',
						default: false,
						description:
							'Whether to check pages for handwriting. Will use specialized models if handwriting is found.',
						routing: {
							send: {
								type: 'query',
								property: 'handwriting_check',
							},
						},
					},
					{
						displayName: 'Ingest Mode',
						name: 'ingest_mode',
						type: 'options',
						default: 'standard',
						description:
							'Ingest mode to use. - `standard` - Files will be ingested for use with RAG - `agent_only` - Bypasses standard ingestion....',
						options: [
							{
								name: 'Standard',
								value: 'standard',
							},
							{
								name: 'Agent Only',
								value: 'agent_only',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'ingest_mode',
							},
						},
					},
					{
						displayName: 'Keep Tables As One Chunk',
						name: 'keep_tables_as_one_chunk',
						type: 'boolean',
						default: false,
						description:
							'Whether tables are identified by the table parser the table tokens will be kept in a single chunk',
						routing: {
							send: {
								type: 'query',
								property: 'keep_tables_as_one_chunk',
							},
						},
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '={{ {} }}',
						description: 'Metadata for the document',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
					},
					{
						displayName: 'Ocr Model',
						name: 'ocr_model',
						type: 'string',
						default: 'auto',
						description:
							'Which method to use to extract text from images using AI-enabled optical character recognition (OCR) models. docTR is be...',
						routing: {
							send: {
								type: 'query',
								property: 'ocr_model',
							},
						},
					},
					{
						displayName: 'Tesseract Lang',
						name: 'tesseract_lang',
						type: 'string',
						default: '',
						description: 'Which language to use when using ocr_model="tesseract"',
						routing: {
							send: {
								type: 'query',
								property: 'tesseract_lang',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['create_chat_session'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Collection ID',
						name: 'collection_id',
						type: 'string',
						default: '',
						description: 'ID of collection',
						routing: {
							send: {
								type: 'query',
								property: 'collection_id',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_chat_sessions'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chat sessions to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Session IDs',
				name: 'session_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of chat sessions to be deleted',
				routing: {
					send: {
						type: 'body',
						property: 'session_ids',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['create_delete_chat_session_job'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_chat_session'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_chat_session'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_chat_session'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session_collection'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session_collection'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_chat_session_collection'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session_prompt_template'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_chat_session_prompt_template'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Prompt Template ID',
						name: 'prompt_template_id',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_template_id',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_chat_session_prompt_template'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_agent_server_files'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_agent_server_files'],
					},
				},
			},
			{
				displayName: 'Session IDs',
				name: 'session_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_agent_server_directories'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_agent_server_directories'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Dir Types',
						name: 'dir_types',
						type: 'string',
						default: '',
						description: 'Types of agent directories to be deleted',
						routing: {
							send: {
								type: 'query',
								property: 'dir_types',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_all_agent_server_directories_stats'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_all_agent_server_directories_stats'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Detail Level',
						name: 'detail_level',
						type: 'number',
						default: 0,
						description: 'The higher value, more details are returned',
						routing: {
							send: {
								type: 'query',
								property: 'detail_level',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_agent_server_directory_stats'],
					},
				},
			},
			{
				displayName: 'Directory Name',
				name: 'directory_name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_agent_server_directory_stats'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_agent_server_directory_stats'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Detail Level',
						name: 'detail_level',
						type: 'number',
						default: 0,
						description: 'The higher value, more details are returned',
						routing: {
							send: {
								type: 'query',
								property: 'detail_level',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_completion'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				description: 'A query or an instruction from the end user to the LLM',
				placeholder: 'e.g. Who is the strongest hero?',
				routing: {
					send: {
						type: 'body',
						property: 'message',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_completion'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_completion'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Image Batch Final Prompt',
						name: 'image_batch_final_prompt',
						type: 'string',
						default: '',
						description: 'A prompt for each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_final_prompt',
							},
						},
					},
					{
						displayName: 'Image Batch Image Prompt',
						name: 'image_batch_image_prompt',
						type: 'string',
						default: '',
						description: 'A prompt to reduce all answers each image batch for vision models',
						routing: {
							send: {
								type: 'body',
								property: 'image_batch_image_prompt',
							},
						},
					},
					{
						displayName: 'Include Chat History',
						name: 'include_chat_history',
						type: 'string',
						default: '',
						description:
							'Whether to include chat history. Includes previous questions and answers for the current chat session for each new chat ...',
						routing: {
							send: {
								type: 'body',
								property: 'include_chat_history',
							},
						},
					},
					{
						displayName: 'Llm',
						name: 'llm',
						type: 'string',
						default: '',
						description:
							'LLM name to send the query. Use "auto" for automatic model routing, set cost_controls of llm_args for detailed control o...',
						routing: {
							send: {
								type: 'body',
								property: 'llm',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Pre Prompt Query',
						name: 'pre_prompt_query',
						type: 'string',
						default: '',
						description:
							'A text that is prepended before the contextual document chunks. The default can be customized per environment.',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_query',
							},
						},
					},
					{
						displayName: 'Prompt Query',
						name: 'prompt_query',
						type: 'string',
						default: '',
						description:
							"A text that is appended to the beginning of the user's message. The default can be customized per environment.",
						routing: {
							send: {
								type: 'body',
								property: 'prompt_query',
							},
						},
					},
					{
						displayName: 'Rag Config',
						name: 'rag_config',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map with arguments to control RAG (retrieval-augmented-generation) types.: * `rag_type` **(type=enum[auto, llm_only,',
						routing: {
							send: {
								type: 'body',
								property: 'rag_config',
							},
						},
					},
					{
						displayName: 'Self Reflection Config',
						name: 'self_reflection_config',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map with self reflection settings: * `llm_reflection` **(type=string, example=gpt-4-0613)** * `prompt_reflection`',
						routing: {
							send: {
								type: 'body',
								property: 'self_reflection_config',
							},
						},
					},
					{
						displayName: 'Stream',
						name: 'stream',
						type: 'boolean',
						default: false,
						routing: {
							send: {
								type: 'body',
								property: 'stream',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description:
							"A text sent to models which support system prompts. It gives the model overall context in how to respond. Use 'auto' for...",
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'A list of tags from which to pull the context for RAG',
						routing: {
							send: {
								type: 'body',
								property: 'tags',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of a chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_questions_for_chat_session'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_questions_for_chat_session'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Session ID',
				name: 'session_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_chat_session_messages'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_chat_session_messages'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many chat sessions to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Message IDs',
				name: 'message_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of messages to be deleted',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['delete_messages'],
					},
				},
			},
			{
				displayName: 'Message ID',
				name: 'message_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_message_references'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_message_references'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Message ID',
				name: 'message_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_message_meta'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['get_message_meta'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Info Type',
						name: 'info_type',
						type: 'options',
						default: 'self_reflection',
						description: 'Metadata type to fetch',
						options: [
							{
								name: 'Hyde1',
								value: 'hyde1',
							},
							{
								name: 'Llm Only',
								value: 'llm_only',
							},
							{
								name: 'Prompt Raw',
								value: 'prompt_raw',
							},
							{
								name: 'Self Reflection',
								value: 'self_reflection',
							},
							{
								name: 'Usage Stats',
								value: 'usage_stats',
							},
						],
						routing: {
							send: {
								type: 'query',
								property: 'info_type',
							},
						},
					},
				],
			},
			{
				displayName: 'Message ID',
				name: 'message_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the chat message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['set_message_votes'],
					},
				},
			},
			{
				displayName: 'Votes',
				name: 'votes',
				type: 'number',
				default: 0,
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'votes',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['set_message_votes'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['list_question_answer_feedbacks'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many feedbacks to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'Answer ID',
				name: 'answer_id',
				type: 'string',
				default: '',
				required: true,
				description: 'Unique identifier of and answer connected with a feedback',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_question_answer_feedback'],
					},
				},
			},
			{
				displayName: 'Expected Answer',
				name: 'expected_answer',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'expected_answer',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_question_answer_feedback'],
					},
				},
			},
			{
				displayName: 'User Comment',
				name: 'user_comment',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'user_comment',
					},
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['update_question_answer_feedback'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'job_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the job',
				displayOptions: {
					show: {
						resource: ['job'],
						operation: ['get_job'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'job_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the job',
				displayOptions: {
					show: {
						resource: ['job'],
						operation: ['delete_job'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'job_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the job',
				displayOptions: {
					show: {
						resource: ['job'],
						operation: ['cancel_job'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'job_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the job',
				displayOptions: {
					show: {
						resource: ['job'],
						operation: ['cancel_user_job'],
					},
				},
			},
			{
				displayName: 'Model ID',
				name: 'model_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the embedding model that will be used for operation',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['encode_chunks_for_retrieval'],
					},
				},
			},
			{
				displayName: 'Chunks',
				name: 'chunks',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'chunks',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['encode_chunks_for_retrieval'],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collection_id',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'collection_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['create_topic_model_job'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['create_topic_model_job'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'query',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Model Name',
				name: 'model_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of LLM',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['run_model_self_test'],
					},
				},
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				default: 'quick',
				required: true,
				description: 'Mode of the self test',
				options: [
					{
						name: 'Quick',
						value: 'quick',
					},
					{
						name: 'Rag',
						value: 'rag',
					},
					{
						name: 'Full',
						value: 'full',
					},
					{
						name: 'Agent',
						value: 'agent',
					},
				],
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['run_model_self_test'],
					},
				},
			},
			{
				displayName: 'Model Name',
				name: 'model_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of LLM. Use auto, when you are not interested in particular model.',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['answer_question'],
					},
				},
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				required: true,
				description: 'Text query to send to the LLM',
				routing: {
					send: {
						type: 'body',
						property: 'question',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['answer_question'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['answer_question'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Chat Conversation',
						name: 'chat_conversation',
						type: 'json',
						default: '={{ {} }}',
						description:
							'List of tuples for (human, bot) conversation that will be pre-appended to an (question, None) case for a query',
						routing: {
							send: {
								type: 'body',
								property: 'chat_conversation',
							},
						},
					},
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Pre Prompt Query',
						name: 'pre_prompt_query',
						type: 'string',
						default: '',
						description:
							'Text that is prepended before the contextual document chunks in text_context_list. Only used if text_context_list is pro...',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_query',
							},
						},
					},
					{
						displayName: 'Prompt Query',
						name: 'prompt_query',
						type: 'string',
						default: '',
						description:
							'Text that is appended after the contextual document chunks in text_context_list. Only used if text_context_list is provi...',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_query',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description:
							'Text sent to models which support system prompts. Gives the model overall context in how to respond. Use `auto` for the ...',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'Text Context List',
						name: 'text_context_list',
						type: 'string',
						default: '',
						description: 'List of raw text strings to be summarized',
						routing: {
							send: {
								type: 'body',
								property: 'text_context_list',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'body',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Model Name',
				name: 'model_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of LLM. Use auto, when you are not interested in particular model.',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['summarize_content'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['summarize_content'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Pre Prompt Summary',
						name: 'pre_prompt_summary',
						type: 'string',
						default: '',
						description:
							'Text that is prepended before the list of texts. The default can be customized per environment, but the standard default...',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_summary',
							},
						},
					},
					{
						displayName: 'Prompt Summary',
						name: 'prompt_summary',
						type: 'string',
						default: '',
						description:
							'Text that is appended after the list of texts. The default can be customized per environment, but the standard default i...',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_summary',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description:
							'Text sent to models which support system prompts. Gives the model overall context in how to respond. Use `auto` for the ...',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'Text Context List',
						name: 'text_context_list',
						type: 'string',
						default: '',
						description: 'List of raw text strings to be summarized',
						routing: {
							send: {
								type: 'body',
								property: 'text_context_list',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'body',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Model Name',
				name: 'model_name',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of LLM. Use auto, when you are not interested in particular model.',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['extract_data'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['extract_data'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Llm Args',
						name: 'llm_args',
						type: 'json',
						default: '={{ {} }}',
						description:
							'A map of arguments sent to LLM with query. * `temperature` **(type=double, default=0.0)** - A value used to modulate t...',
						routing: {
							send: {
								type: 'body',
								property: 'llm_args',
							},
						},
					},
					{
						displayName: 'Pre Prompt Extract',
						name: 'pre_prompt_extract',
						type: 'string',
						default: '',
						description:
							'Text that is prepended before the list of texts. If not set, the inputs will be summarized.',
						routing: {
							send: {
								type: 'body',
								property: 'pre_prompt_extract',
							},
						},
					},
					{
						displayName: 'Prompt Extract',
						name: 'prompt_extract',
						type: 'string',
						default: '',
						description:
							'Text that is appended after the list of texts. If not set, the inputs will be summarized.',
						routing: {
							send: {
								type: 'body',
								property: 'prompt_extract',
							},
						},
					},
					{
						displayName: 'System Prompt',
						name: 'system_prompt',
						type: 'string',
						default: '',
						description:
							'Text sent to models which support system prompts. Gives the model overall context in how to respond. Use `auto` for the ...',
						routing: {
							send: {
								type: 'body',
								property: 'system_prompt',
							},
						},
					},
					{
						displayName: 'Text Context List',
						name: 'text_context_list',
						type: 'string',
						default: '',
						description: 'List of raw text strings to be summarized',
						routing: {
							send: {
								type: 'body',
								property: 'text_context_list',
							},
						},
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 0,
						description: 'Timeout in seconds',
						routing: {
							send: {
								type: 'body',
								property: 'timeout',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['create_guardrails_settings'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Action',
						name: 'action',
						type: 'string',
						default: '',
						description:
							'What to do when detecting PII, either "redact" or "fail" ("allow" would keep PII intact). Guardrails models always fail ...',
						routing: {
							send: {
								type: 'body',
								property: 'action',
							},
						},
					},
					{
						displayName: 'All Guardrails',
						name: 'all_guardrails',
						type: 'boolean',
						default: false,
						description:
							'Whether to include all possible entities for prompt guard and guardrails models, or just system defaults',
						routing: {
							send: {
								type: 'body',
								property: 'all_guardrails',
							},
						},
					},
					{
						displayName: 'Guardrails Settings',
						name: 'guardrails_settings',
						type: 'json',
						default: '={{ {} }}',
						routing: {
							send: {
								type: 'body',
								property: 'guardrails_settings',
							},
						},
					},
					{
						displayName: 'Non Sensitive',
						name: 'non_sensitive',
						type: 'boolean',
						default: false,
						description:
							'Whether to include all non-sensitive PII entities, such as IP addresses, locations, names, e-mail addresses etc',
						routing: {
							send: {
								type: 'body',
								property: 'non_sensitive',
							},
						},
					},
					{
						displayName: 'Sensitive',
						name: 'sensitive',
						type: 'boolean',
						default: false,
						description:
							'Whether to include the most sensitive PII entities like SSN, bank account info',
						routing: {
							send: {
								type: 'body',
								property: 'sensitive',
							},
						},
					},
				],
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				required: true,
				description:
					'The length of an interval for which the stats will be obtained. The interval ends now.',
				placeholder: 'e.g. 24 hours',
				routing: {
					send: {
						type: 'query',
						property: 'interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['get_usage_stats'],
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				required: true,
				description:
					'The length of an interval for which the stats will be obtained. The interval ends now.',
				placeholder: 'e.g. 24 hours',
				routing: {
					send: {
						type: 'query',
						property: 'interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['get_usage_stats_by_model'],
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				required: true,
				description:
					'The length of an interval for which the stats will be obtained. The interval ends now.',
				placeholder: 'e.g. 24 hours',
				routing: {
					send: {
						type: 'query',
						property: 'interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['get_usage_stats_by_user'],
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				required: true,
				description:
					'The length of an interval for which the stats will be obtained. The interval ends now.',
				placeholder: 'e.g. 24 hours',
				routing: {
					send: {
						type: 'query',
						property: 'interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['get_usage_stats_by_model_and_user'],
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				required: true,
				description:
					'The length of an interval for which the stats will be obtained. The interval ends now.',
				placeholder: 'e.g. 24 hours',
				routing: {
					send: {
						type: 'query',
						property: 'interval',
					},
				},
				displayOptions: {
					show: {
						resource: ['model'],
						operation: ['get_performance_stats_by_model'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['list_users'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many users to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
				],
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_user'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_user_permissions'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_user_roles'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['reset_user_roles'],
					},
				},
			},
			{
				displayName: 'New Roles',
				name: 'new_roles',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'new_roles',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['reset_user_roles'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_roles_to_user'],
					},
				},
			},
			{
				displayName: 'Role Names',
				name: 'role_names',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_roles_to_user'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_roles_from_user'],
					},
				},
			},
			{
				displayName: 'Role Names',
				name: 'role_names',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_roles_from_user'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['create_group'],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['create_group'],
					},
				},
			},
			{
				displayName: 'Names',
				name: 'names',
				type: 'string',
				default: '',
				required: true,
				description: 'Names of groups to be deleted',
				routing: {
					send: {
						type: 'query',
						property: 'names',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['delete_groups_by_names'],
					},
				},
			},
			{
				displayName: 'Group IDs',
				name: 'group_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifiers of groups to be deleted',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['delete_groups'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of a group',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_group_roles'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of a group',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['reset_group_roles'],
					},
				},
			},
			{
				displayName: 'New Roles',
				name: 'new_roles',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'new_roles',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['reset_group_roles'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of a group',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_roles_to_group'],
					},
				},
			},
			{
				displayName: 'Role Names',
				name: 'role_names',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_roles_to_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of a group',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_roles_from_group'],
					},
				},
			},
			{
				displayName: 'Role Names',
				name: 'role_names',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_roles_from_group'],
					},
				},
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of a group',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_group_permissions'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['create_role'],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['create_role'],
					},
				},
			},
			{
				displayName: 'Names',
				name: 'names',
				type: 'string',
				default: '',
				required: true,
				description: 'Names of roles to be deleted',
				routing: {
					send: {
						type: 'query',
						property: 'names',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['delete_roles_by_names'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_role'],
					},
				},
			},
			{
				displayName: 'Role IDs',
				name: 'role_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifiers of roles to be deleted',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['delete_roles'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['get_role_permissions'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['set_role_permissions'],
					},
				},
			},
			{
				displayName: 'New Permissions',
				name: 'new_permissions',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'new_permissions',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['set_role_permissions'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_permission_to_role'],
					},
				},
			},
			{
				displayName: 'Permission Name',
				name: 'permission_name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['assign_permission_to_role'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an user',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_permission_from_role'],
					},
				},
			},
			{
				displayName: 'Permission Name',
				name: 'permission_name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['remove_permission_from_role'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['set_role_priority'],
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 0,
				required: true,
				description: 'The priority to be set for the role',
				routing: {
					send: {
						type: 'body',
						property: 'priority',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['set_role_priority'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['list_role_configurations'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of an role',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_role_configuration'],
					},
				},
			},
			{
				displayName: 'Key Name',
				name: 'key_name',
				type: 'string',
				default: '',
				required: true,
				description: 'The key of the configuration item that will be set',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_role_configuration'],
					},
				},
			},
			{
				displayName: 'Key Name',
				name: 'key_name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'key_name',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_role_configuration'],
					},
				},
			},
			{
				displayName: 'String Value',
				name: 'string_value',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'string_value',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_role_configuration'],
					},
				},
			},
			{
				displayName: 'Value Type',
				name: 'value_type',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'value_type',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_role_configuration'],
					},
				},
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of the role',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['delete_role_configurations'],
					},
				},
			},
			{
				displayName: 'Key Names',
				name: 'key_names',
				type: 'string',
				default: '',
				required: true,
				description: 'Keys of the configuration items that will be deleted',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['delete_role_configurations'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['list_permissions'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Group Names',
						name: 'group_names',
						type: 'string',
						default: '',
						description: 'If set, the output permissions will be related only to given groups',
						routing: {
							send: {
								type: 'query',
								property: 'group_names',
							},
						},
					},
					{
						displayName: 'Role Names',
						name: 'role_names',
						type: 'string',
						default: '',
						description: 'If set, the output permissions will be related only to given roles',
						routing: {
							send: {
								type: 'query',
								property: 'role_names',
							},
						},
					},
				],
			},
			{
				displayName: 'Permission',
				name: 'permission',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'permission',
					},
				},
				displayOptions: {
					show: {
						resource: ['permission'],
						operation: ['is_permission_granted'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['list_global_configurations'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'As Admin',
						name: 'as_admin',
						type: 'boolean',
						default: false,
						description:
							'Whether set, lists global configurations with admin permissions. The user must be admin.',
						routing: {
							send: {
								type: 'query',
								property: 'as_admin',
							},
						},
					},
				],
			},
			{
				displayName: 'Key Name',
				name: 'key_name',
				type: 'string',
				default: '',
				required: true,
				description: 'The key of the configuration item that will be set',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_global_configuration'],
					},
				},
			},
			{
				displayName: 'String Value',
				name: 'string_value',
				type: 'string',
				default: '',
				required: true,
				description: 'The value to be set for the global config',
				routing: {
					send: {
						type: 'body',
						property: 'string_value',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_global_configuration'],
					},
				},
			},
			{
				displayName: 'Can Overwrite',
				name: 'can_overwrite',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Whether user settings can override this global setting',
				routing: {
					send: {
						type: 'body',
						property: 'can_overwrite',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_global_configuration'],
					},
				},
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Whether users can see the value for this global setting',
				routing: {
					send: {
						type: 'body',
						property: 'is_public',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_global_configuration'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_global_configuration'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Value Type',
						name: 'value_type',
						type: 'string',
						default: '',
						description: 'The type of the value to be set for the global config',
						routing: {
							send: {
								type: 'body',
								property: 'value_type',
							},
						},
					},
				],
			},
			{
				displayName: 'Key Names',
				name: 'key_names',
				type: 'string',
				default: '',
				required: true,
				description: 'Keys of the configuration items that will be deleted',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['delete_global_configurations'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of the user',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['list_user_configurations'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of the user',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_user_configuration'],
					},
				},
			},
			{
				displayName: 'Key Name',
				name: 'key_name',
				type: 'string',
				default: '',
				required: true,
				description: 'The key of the configuration item that will be set',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_user_configuration'],
					},
				},
			},
			{
				displayName: 'String Value',
				name: 'string_value',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'string_value',
					},
				},
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_user_configuration'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['set_user_configuration'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Value Type',
						name: 'value_type',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'value_type',
							},
						},
					},
				],
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of the user',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['reset_user_configuration'],
					},
				},
			},
			{
				displayName: 'Key Name',
				name: 'key_name',
				type: 'string',
				default: '',
				required: true,
				description: 'The key of the configuration item that will be set',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['reset_user_configuration'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifier of the user',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['delete_user_configurations'],
					},
				},
			},
			{
				displayName: 'Key Names',
				name: 'key_names',
				type: 'string',
				default: '',
				required: true,
				description: 'Keys of the configuration items that will be deleted',
				displayOptions: {
					show: {
						resource: ['configuration'],
						operation: ['delete_user_configurations'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the user the key will be created for',
				routing: {
					send: {
						type: 'body',
						property: 'user_id',
					},
				},
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['create_api_key_for_user'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['create_api_key_for_user'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name for the API key',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Collection ID',
						name: 'collection_id',
						type: 'string',
						default: '',
						description: 'The ID of the collection you want the key to be configured to',
						routing: {
							send: {
								type: 'body',
								property: 'collection_id',
							},
						},
					},
					{
						displayName: 'Expires In',
						name: 'expires_in',
						type: 'string',
						default: '',
						description: 'Interval of when the API key should expire',
						placeholder: 'e.g. 30 days',
						routing: {
							send: {
								type: 'body',
								property: 'expires_in',
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['list_all_api_keys'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many API keys to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Filter',
						name: 'filter',
						type: 'string',
						default: '',
						description: 'Only returns keys for usernames matching this filter',
						routing: {
							send: {
								type: 'query',
								property: 'filter',
							},
						},
					},
				],
			},
			{
				displayName: 'Key ID',
				name: 'key_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the key to deactivate',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['deactivate_api_key'],
					},
				},
			},
			{
				displayName: 'Key ID',
				name: 'key_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the key to update',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['update_api_key_expiry'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['update_api_key_expiry'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Expires In',
						name: 'expires_in',
						type: 'string',
						default: '',
						description:
							'Interval of when the API key should expire. Do not include if you would like to remove the expiry of a key.',
						placeholder: 'e.g. 30 days',
						routing: {
							send: {
								type: 'body',
								property: 'expires_in',
							},
						},
					},
				],
			},
			{
				displayName: 'Key ID',
				name: 'key_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the key to delete',
				displayOptions: {
					show: {
						resource: ['apiKey'],
						operation: ['delete_api_key'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['list_agent_directory_stats'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'How many agent chat sessions to skip before returning',
						routing: {
							send: {
								type: 'query',
								property: 'offset',
							},
						},
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
						routing: {
							send: {
								type: 'query',
								property: 'limit',
							},
						},
					},
					{
						displayName: 'Filter Text',
						name: 'filter_text',
						type: 'string',
						default: '',
						description: 'Applied text filter',
						routing: {
							send: {
								type: 'query',
								property: 'filter_text',
							},
						},
					},
				],
			},
			{
				displayName: 'Reference Value',
				name: 'reference_value',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'reference_value',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['update_agent_tool_preference'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key'],
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key'],
					},
				},
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'value',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
				],
			},
			{
				displayName: 'Key ID',
				name: 'key_id',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the key to be updated',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['update_agent_key'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['update_agent_key'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'type',
							},
						},
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'value',
							},
						},
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
				],
			},
			{
				displayName: 'Key IDs',
				name: 'key_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'IDs of keys to be deleted',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['delete_agent_keys'],
					},
				},
			},
			{
				displayName: 'Tool',
				name: 'tool',
				type: 'string',
				default: '',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'tool',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key_tool_associations'],
					},
				},
			},
			{
				displayName: 'Keys',
				name: 'keys',
				type: 'json',
				default: '={{ {} }}',
				required: true,
				routing: {
					send: {
						type: 'body',
						property: 'keys',
					},
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create_agent_key_tool_associations'],
					},
				},
			},
			{
				displayName: 'Associate IDs',
				name: 'associate_ids',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique identifiers of tool associations to be deleted',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['delete_agent_tool_association'],
					},
				},
			},
		],
	};
}
