import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import type React from 'react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { latestAssetQueryDocument } from '@/components/dataset-table';
import { useStore } from '@/components/store';
import { graphql } from '@/gql';
import { getIpfsGatewayUrl } from '@/lib/ipfs';
import { Code } from '@nextui-org/code';

type FormState = {
  fromId: string;
};

const createDatasetMutationDocument = graphql(`
  mutation CreateDatasetCsv($data: CreateDatasetCsvInput!) {
    createDatasetCsv(data: $data) {
      cid
    }
  }
`);

export const DownloadModal: React.FC = () => {
  const isOpen = useStore((state) => state.downloadModalOpen);
  const setOpen = useStore((state) => state.setDownloadModalOpen);
  const type = useStore((state) => state.type);
  const { data: latestAssetQueryData } = useQuery(latestAssetQueryDocument, {
    variables: {
      type,
    },
  });
  const [createDataset] = useMutation(createDatasetMutationDocument);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<FormState>({
    defaultValues: {
      fromId: '',
    },
  });

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const { fromId } = data;

    try {
      setError('');
      const { data } = await createDataset({
        variables: {
          data: {
            type,
            fromId: fromId,
          },
        },
      });

      if (!data) {
        setError('Failed to create dataset');

        return;
      }

      const {
        createDatasetCsv: { cid },
      } = data;

      window.open(
        getIpfsGatewayUrl(
          cid,
          `dataset${fromId ? `-${fromId}-to` : ''}-${latestAssetQueryData?.latestAsset?.id}.csv`,
        ),
        '_blank',
      );

      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError((error as { message: string }).message);
    }
  };

  return (
    <Modal
      hideCloseButton={true}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={(isOpen) => setOpen(isOpen)}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-10">
              Download {type} dataset
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row w-full flex-wrap gap-1">
                <Code className="flex-1 font-bold">
                  {latestAssetQueryData?.latestAsset?.id ?? 'N/A'}
                </Code>
                <Code color="secondary" className="font-bold">
                  latest
                </Code>
              </div>
              <Input
                {...register('fromId')}
                errorMessage={errors.fromId?.message}
                label="From ID"
                placeholder="From ID, leave empty to download all"
              />
              {error && (
                <strong>
                  <span className="text-danger text-sm">Error: {error}</span>
                </strong>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                isDisabled={isLoading}
                variant="flat"
                onPress={() => {
                  onClose();
                  reset();
                }}
              >
                Close
              </Button>
              <Button color="primary" isLoading={isLoading} type="submit">
                Download
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
