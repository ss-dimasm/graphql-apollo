import React, { FC, useState } from 'react'
import {
  Title,
  PageContainer,
  FlexContainer,
  Loader,
  elWFull,
  Button,
  elMb4,
  useModal,
  ToggleRadio,
  Label,
} from '@reapit/elements'
import { useMutation, useQuery } from '@apollo/client'
import { cx } from '@linaria/core'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import {
  GET_PROPERTIES,
  PropertiesListQueryData,
  PropertiesListQueryVariables,
} from '../../graphql/queries/get-properties'
import {
  UpdateAdvertisingPropertiesListQueryData,
  UpdateAdvertisingPropertiesListQueryVariables,
  UPDATE_ADVERTISING_PROPERTY,
} from '../../graphql/mutations/update-advertising-property'

export const HomePage: FC = () => {
  const { openModal, Modal } = useModal('docs-root')
  const [selectedTenancyId, setSelectedPropertyId] = useState<NonNullable<PropertyModel> | undefined>(undefined)

  const { loading, data } = useQuery<PropertiesListQueryData, PropertiesListQueryVariables>(GET_PROPERTIES)

  const [mutateProperty, { data: mutationData }] = useMutation<
    UpdateAdvertisingPropertiesListQueryData,
    UpdateAdvertisingPropertiesListQueryVariables
  >(UPDATE_ADVERTISING_PROPERTY)

  const onModalOpenHandler = (property: NonNullable<PropertyModel>) => {
    setSelectedPropertyId(property)
    openModal()
  }

  interface ModalSubmitHandler {
    property: string
    option: boolean
  }
  // eslint-disable-next-line no-unused-vars
  const onModalSubmitHandler = ({ property, option }: ModalSubmitHandler) => {
    mutateProperty({
      variables: {
        id: selectedTenancyId?.id!,
        _eTag: selectedTenancyId?._eTag!,
        internetAdvertising: false,
      },
    })
  }

  console.log(mutationData)

  return (
    <PageContainer>
      <Title>Welcome To Reapit Foundations</Title>
      <FlexContainer isFlexJustifyBetween>
        <div>
          <h1>GraphQL is loading: {loading ? 'true' : 'false'}</h1>
        </div>
      </FlexContainer>
      <hr />
      <div>
        {!loading ? (
          <FlexContainer className={elWFull} isFlexColumn>
            {data?.GetProperties?._embedded.map((property) => (
              <div className={cx(elMb4)} key={property.id}>
                <h1>Property ID: {property?.id}</h1>
                <h3>ETag: {property?._eTag}</h3>
                <Button intent="primary" fullWidth onClick={() => onModalOpenHandler(property)}>
                  Edit
                </Button>
              </div>
            ))}
          </FlexContainer>
        ) : (
          <Loader label="Loading" />
        )}
      </div>
      <Modal>
        <div>
          <Label>Is Periodic for {selectedTenancyId?.id}</Label>
          <ToggleRadio
            name="my-cool-toggle-radio-full-width-grey"
            isFullWidth
            hasGreyBg
            options={[
              {
                id: 'option-1-fw-grey',
                value: 'option-1-fw-grey',
                text: 'Active',
                isChecked: selectedTenancyId?.internetAdvertising === true,
              },
              {
                id: 'option-2-fw-grey',
                value: 'option-2-fw-grey',
                text: 'Inactive',
                isChecked: selectedTenancyId?.internetAdvertising === false,
              },
            ]}
          />
          <FlexContainer isFlexJustifyEnd className="el-mt5">
            <Button
              intent="success"
              onClick={() => onModalSubmitHandler({ property: selectedTenancyId?.id!, option: true })}
            >
              Confirm
            </Button>
          </FlexContainer>
        </div>
      </Modal>
    </PageContainer>
  )
}

export default HomePage
