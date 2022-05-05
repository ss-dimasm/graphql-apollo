/* eslint-disable  */
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  Button,
  ButtonGroup,
  FormLayout,
  InputGroup,
  InputWrap,
  Loader,
  PageContainer,
  Subtitle,
  useModal,
} from '@reapit/elements'
import {
  GET_PROPERTIES,
  PropertiesListQueryData,
  PropertiesListQueryVariables,
} from '../../graphql/queries/get-properties'
import PropertyBox from '../ui/property-box/property-box'
import {
  GET_SINGLE_NEGOTIATOR,
  NegotiatorListQuery,
  NegotiatorListVariables,
} from '../../graphql/queries/get-negotiator'

const PropertyPage = () => {
  const [selectedNegotiator, setSelectedNegotiator] = useState<string | undefined>()

  const {
    Modal: NegotiatorModal,
    openModal: openNegotiatorModal,
    closeModal: closeNegotiatorModal,
  } = useModal('docs-root')

  const handleSelectedNegotiator = (negotiatorId: string) => {
    setSelectedNegotiator(negotiatorId)
    openNegotiatorModal()
  }
  const handleCloseModal = () => {
    setSelectedNegotiator(undefined)
    closeNegotiatorModal()
  }

  useEffect(() => {
    if (!selectedNegotiator) return
    fetchNegotiator()
  }, [selectedNegotiator])

  const { data: PropertiesData, loading: PropertyListIsLoading } = useQuery<
    PropertiesListQueryData,
    PropertiesListQueryVariables
  >(GET_PROPERTIES, {
    variables: {
      pageSize: 15,
    },
  })

  const [fetchNegotiator, { data: NegotiatorData, loading: NegotiatorIsLoading }] = useLazyQuery<
    NegotiatorListQuery,
    NegotiatorListVariables
  >(GET_SINGLE_NEGOTIATOR, {
    variables: {
      id: selectedNegotiator ?? 'JAS',
    },
  })

  const render = () => {
    if (PropertiesData && !PropertyListIsLoading) {
      return PropertiesData.GetProperties._embedded.map((data) => (
        <PropertyBox key={data.id} handleNegotiatorModal={handleSelectedNegotiator} data={data} />
      ))
    } else {
      return <Loader label="Please wait" />
    }
  }

  return (
    <PageContainer>
      <form>
        <FormLayout>
          <InputWrap>
            <InputGroup label="Search by location" placeholder="Search by location" />
          </InputWrap>
        </FormLayout>
        <ButtonGroup alignment="right">
          <Button intent="low">Search</Button>
        </ButtonGroup>
      </form>
      <main>{render()}</main>
      <NegotiatorModal onModalClose={handleCloseModal}>
        {NegotiatorIsLoading ? (
          <Loader />
        ) : (
          <>
            <Subtitle>Negotiator Id: {NegotiatorData?.GetNegotiatorById?.id}</Subtitle>
            <Subtitle>Name: {NegotiatorData?.GetNegotiatorById?.name}</Subtitle>
          </>
        )}
      </NegotiatorModal>
    </PageContainer>
  )
}

export default PropertyPage
