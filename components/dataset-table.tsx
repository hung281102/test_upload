import { useLazyQuery, useQuery } from '@apollo/client';
import { Button } from '@nextui-org/button';
import { Code } from '@nextui-org/code';
import { Link } from '@nextui-org/link';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/table';
import { useAsyncList } from '@react-stately/data';
import type React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import { graphql } from '@/gql';
import { type Asset, type AssetType, SortOrder } from '@/gql/graphql';
import { getIpfsGatewayUrl } from '@/lib/ipfs';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useDisclosure } from '@nextui-org/use-disclosure';

const assetsQueryDocument = graphql(`
  query Assets($input: GetAssetsInput!) {
    assets(input: $input) {
      records {
        id
        cid
        type
        features
      }
      fetchedRecordsCount
      bookmark
    }
  }
`);

export const latestAssetQueryDocument = graphql(`
  query LatestAsset($type: AssetType!) {
    latestAsset(type: $type) {
      id
      cid
      type
      features
    }
  }
`);

const PER_PAGE = 10;

interface Props {
  type: AssetType;
}

const getIsMalicious = (features: Record<string, number>) => {
  return features.Malicious === 1;
};

export const DatasetTable: React.FC<Props> = ({ type }) => {
  const [fetchAssets] = useLazyQuery(assetsQueryDocument);
  const {
    isOpen: isFeatureModalOpen,
    onOpen: onFeatureModalOpen,
    onOpenChange: onFeatureModalOpenChange,
  } = useDisclosure();
  const [selectedFeatures, setSelectedFeatures] =
    useState<Record<string, number>>();

  const list = useAsyncList<Asset>({
    async load({ cursor }) {
      const { data } = await fetchAssets({
        variables: {
          input: {
            type: type,
            order: SortOrder.Asc,
            take: PER_PAGE,
            bookmark: cursor,
          },
        },
        fetchPolicy: 'no-cache',
      });

      if (!data) {
        return {
          items: [],
          cursor: undefined,
        };
      }

      const {
        assets: { records, bookmark },
      } = data;

      return {
        items: records,
        cursor: bookmark,
      };
    },
  });

  return (
    <>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Button
              isDisabled={list.isLoading}
              isLoading={list.isLoading}
              variant="flat"
              onClick={list.loadMore}
            >
              Load More
            </Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="id" align="center" className="text-center">
            ID
          </TableColumn>
          <TableColumn key="cid" align="center" className="text-center">
            CID
          </TableColumn>
          <TableColumn key="tag" align="center" className="text-center">
            TAG
          </TableColumn>
          <TableColumn key="features" align="center" className="text-center">
            FEATURES
          </TableColumn>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'id' && <Code>{item.id}</Code>}
                  {columnKey === 'cid' && (
                    <Code>
                      <Link
                        href={getIpfsGatewayUrl(getKeyValue(item, columnKey))}
                        isExternal={true}
                      >
                        {item.cid}
                      </Link>
                    </Code>
                  )}
                  {columnKey === 'tag' &&
                    (getIsMalicious(item.features) ? (
                      <Code color="warning">Malicious</Code>
                    ) : (
                      <Code color="success">Benign</Code>
                    ))}
                  {columnKey === 'features' && (
                    <Button
                      onPress={() => {
                        setSelectedFeatures(item.features);
                        onFeatureModalOpen();
                      }}
                      variant="flat"
                      size="sm"
                    >
                      Show
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isFeatureModalOpen}
        onOpenChange={onFeatureModalOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Asset Features
              </ModalHeader>
              <ModalBody>
                <Code className="whitespace-pre-wrap">
                  {JSON.stringify(selectedFeatures, null, 2)}
                </Code>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
