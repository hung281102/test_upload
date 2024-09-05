/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any };
};

export type Asset = {
  __typename?: 'Asset';
  cid: Scalars['String']['output'];
  features: Scalars['JSONObject']['output'];
  id: Scalars['String']['output'];
  type: AssetType;
};

export type AssetPagination = {
  __typename?: 'AssetPagination';
  bookmark: Scalars['String']['output'];
  fetchedRecordsCount: Scalars['Int']['output'];
  records: Array<Asset>;
};

export enum AssetType {
  Pdf = 'PDF',
  Pe = 'PE',
}

export type CreateAssetInput = {
  cid: Scalars['String']['input'];
  isMalicious: Scalars['Boolean']['input'];
  type: AssetType;
};

export type CreateAssetsInput = {
  cidList: Array<Scalars['String']['input']>;
  isMalicious: Scalars['Boolean']['input'];
  type: AssetType;
};

export type CreateDatasetCsvInput = {
  fromId: Scalars['String']['input'];
  type: AssetType;
};

export type DatasetCsv = {
  __typename?: 'DatasetCsv';
  cid: Scalars['String']['output'];
};

export type GetAssetsInput = {
  bookmark?: InputMaybe<Scalars['String']['input']>;
  order: SortOrder;
  take: Scalars['Int']['input'];
  type: AssetType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Asset;
  createAssets: Scalars['Int']['output'];
  createDatasetCsv: DatasetCsv;
};

export type MutationCreateAssetArgs = {
  data: CreateAssetInput;
};

export type MutationCreateAssetsArgs = {
  data: CreateAssetsInput;
};

export type MutationCreateDatasetCsvArgs = {
  data: CreateDatasetCsvInput;
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assets: AssetPagination;
  latestAsset?: Maybe<Asset>;
};

export type QueryAssetArgs = {
  cid: Scalars['String']['input'];
};

export type QueryAssetsArgs = {
  input: GetAssetsInput;
};

export type QueryLatestAssetArgs = {
  type: AssetType;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type AssetsQueryVariables = Exact<{
  input: GetAssetsInput;
}>;

export type AssetsQuery = {
  __typename?: 'Query';
  assets: {
    __typename?: 'AssetPagination';
    fetchedRecordsCount: number;
    bookmark: string;
    records: Array<{
      __typename?: 'Asset';
      id: string;
      cid: string;
      type: AssetType;
      features: any;
    }>;
  };
};

export type LatestAssetQueryVariables = Exact<{
  type: AssetType;
}>;

export type LatestAssetQuery = {
  __typename?: 'Query';
  latestAsset?: {
    __typename?: 'Asset';
    id: string;
    cid: string;
    type: AssetType;
    features: any;
  } | null;
};

export type CreateDatasetCsvMutationVariables = Exact<{
  data: CreateDatasetCsvInput;
}>;

export type CreateDatasetCsvMutation = {
  __typename?: 'Mutation';
  createDatasetCsv: { __typename?: 'DatasetCsv'; cid: string };
};

export type CreateAssetsMutationVariables = Exact<{
  data: CreateAssetsInput;
}>;

export type CreateAssetsMutation = {
  __typename?: 'Mutation';
  createAssets: number;
};

export const AssetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Assets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GetAssetsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'records' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'features' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fetchedRecordsCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'bookmark' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetsQuery, AssetsQueryVariables>;
export const LatestAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LatestAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AssetType' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'latestAsset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'features' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LatestAssetQuery, LatestAssetQueryVariables>;
export const CreateDatasetCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateDatasetCsv' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateDatasetCsvInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createDatasetCsv' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDatasetCsvMutation,
  CreateDatasetCsvMutationVariables
>;
export const CreateAssetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAssets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateAssetsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAssets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAssetsMutation,
  CreateAssetsMutationVariables
>;
