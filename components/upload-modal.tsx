import { useLazyQuery, useMutation } from '@apollo/client'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Select, SelectItem } from '@nextui-org/select'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { latestAssetQueryDocument } from '@/components/dataset-table'
import { BugAntIcon, CheckCircleIcon } from '@/components/icons'
import { useStore } from '@/components/store'
import { graphql } from '@/gql'
import { AssetType } from '@/gql/graphql'
import { ipfs } from '@/lib/ipfs'

const types = Object.values(AssetType).map((type) => ({
  label: type,
  value: type,
}))

type MaliciousTag = 'malicious' | 'benign'
const maliciousTags = [
  {
    label: 'Malicious',
    value: 'malicious',
  },
  {
    label: 'Benign',
    value: 'benign',
  },
]

type FormState = {
  tag: MaliciousTag
  files: File[]
}

const createAssetsMutationDocument = graphql(`
  mutation CreateAssets($data: CreateAssetsInput!) {
    createAssets(data: $data)
  }
`)

export const UploadModal = () => {
  const isOpen = useStore((state) => state.uploadModalOpen)
  const setOpen = useStore((state) => state.setUploadModalOpen)
  const type = useStore((state) => state.type)
  const [createAssets] = useMutation(createAssetsMutationDocument)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setError('')
    }
  }, [isOpen])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>()

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    try {
      setLoading(true)
      setError('')
      const { files, tag } = data

      const cidList = []
      for (const file of files) {
        const { cid } = await ipfs.add(
          {
            content: file,
          },
          {
            wrapWithDirectory: false,
            pin: true,
          },
        )

        await createAssets({
          variables: {
            data: {
              cidList: [cid.toString()],
              type,
              isMalicious: tag === 'malicious',
            },
          },
          refetchQueries: [latestAssetQueryDocument],
        })
      }

      reset()
      setOpen(false)
    } catch (e) {
      console.error(e)
      setError((e as { message: string }).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1">Upload new {type} asset</ModalHeader>
              <ModalBody>
                <Select
                  isDisabled
                  className="flex"
                  items={types}
                  label="File type"
                  placeholder="Select a file type"
                  selectedKeys={[type]}
                >
                  {(type) => <SelectItem key={type.value}>{type.label}</SelectItem>}
                </Select>
                <Select
                  className="flex"
                  items={maliciousTags}
                  label="Tag"
                  placeholder="Select a tag"
                  {...register('tag', { required: 'Required' })}
                  errorMessage={errors.tag?.message}
                  isInvalid={!!errors.tag}
                >
                  {(tag) => (
                    <SelectItem
                      key={tag.value}
                      color={tag.value === 'malicious' ? 'warning' : 'success'}
                      startContent={
                        tag.value === 'malicious' ? <BugAntIcon /> : <CheckCircleIcon />
                      }
                      variant="flat"
                    >
                      {tag.label}
                    </SelectItem>
                  )}
                </Select>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  {...register('files', { required: true })}
                  accept={type === 'PDF' ? 'application/pdf' : '*'}
                  multiple
                />
                {errors.files && <span className="text-danger text-tiny">Missing file</span>}
                {error && (
                  <strong>
                    <span className="text-danger text-tiny">Error: {error}</span>
                  </strong>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={loading}
                  variant="flat"
                  onPress={() => {
                    onClose()
                    reset()
                  }}
                >
                  Close
                </Button>
                <Button color="primary" isLoading={loading} type="submit">
                  Upload
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
