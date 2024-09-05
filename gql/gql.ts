import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query Assets($input: GetAssetsInput!) {\n    assets(input: $input) {\n      records {\n        id\n        cid\n        type\n        features\n      }\n      fetchedRecordsCount\n      bookmark\n    }\n  }\n':
    types.AssetsDocument,
  '\n  query LatestAsset($type: AssetType!) {\n    latestAsset(type: $type) {\n      id\n      cid\n      type\n      features\n    }\n  }\n':
    types.LatestAssetDocument,
  '\n  mutation CreateDatasetCsv($data: CreateDatasetCsvInput!) {\n    createDatasetCsv(data: $data) {\n      cid\n    }\n  }\n':
    types.CreateDatasetCsvDocument,
  '\n  mutation CreateAssets($data: CreateAssetsInput!) {\n    createAssets(data: $data)\n  }\n':
    types.CreateAssetsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Assets($input: GetAssetsInput!) {\n    assets(input: $input) {\n      records {\n        id\n        cid\n        type\n        features\n      }\n      fetchedRecordsCount\n      bookmark\n    }\n  }\n',
): (typeof documents)['\n  query Assets($input: GetAssetsInput!) {\n    assets(input: $input) {\n      records {\n        id\n        cid\n        type\n        features\n      }\n      fetchedRecordsCount\n      bookmark\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query LatestAsset($type: AssetType!) {\n    latestAsset(type: $type) {\n      id\n      cid\n      type\n      features\n    }\n  }\n',
): (typeof documents)['\n  query LatestAsset($type: AssetType!) {\n    latestAsset(type: $type) {\n      id\n      cid\n      type\n      features\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateDatasetCsv($data: CreateDatasetCsvInput!) {\n    createDatasetCsv(data: $data) {\n      cid\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateDatasetCsv($data: CreateDatasetCsvInput!) {\n    createDatasetCsv(data: $data) {\n      cid\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateAssets($data: CreateAssetsInput!) {\n    createAssets(data: $data)\n  }\n',
): (typeof documents)['\n  mutation CreateAssets($data: CreateAssetsInput!) {\n    createAssets(data: $data)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
