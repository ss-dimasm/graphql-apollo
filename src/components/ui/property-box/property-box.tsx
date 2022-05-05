import { useQuery } from '@apollo/client'
import { Card, Loader } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import React from 'react'
import {
  GET_SINGLE_NEGOTIATOR,
  NegotiatorListQuery,
  NegotiatorListVariables,
} from '../../../graphql/queries/get-negotiator'

type PropertyBoxProps = {
  data: NonNullable<PropertyModel>
  handleNegotiatorModal: (negotiatorId: string) => void
}

const getPrice = (
  { marketingMode, selling, letting, currency }: PropertyBoxProps['data'],
  sellingMode: boolean = true,
): string => {
  const availableOptions = {
    selling: selling?.price,
    letting: letting?.rent,
    sellingAndLetting: [selling?.price, letting?.rent],
  }

  let currentPrice = availableOptions[marketingMode!]

  if (marketingMode === 'sellingAndLetting') {
    currentPrice = currentPrice[sellingMode ? 0 : 1]
  }

  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(currentPrice)
}

const getMarketingMode = ({ marketingMode }: PropertyBoxProps['data']): string => {
  const possibleMarketingText = {
    selling: 'Available for Sell',
    letting: 'Available for Rent',
    sellingAndLetting: 'Available for Sell and Rent',
  }

  return possibleMarketingText[marketingMode!]
}

const getAgencyName = ({ GetNegotiatorById: { name } }: NegotiatorListQuery): string => name!

const PropertyBox = ({ data, handleNegotiatorModal }: PropertyBoxProps) => {
  const { data: NegotiatorData, loading } = useQuery<NegotiatorListQuery, NegotiatorListVariables>(
    GET_SINGLE_NEGOTIATOR,
    {
      variables: {
        id: data?.negotiatorId ?? 'JAS',
      },
    },
  )

  if (loading) {
    return <Loader label="wait" />
  }

  return (
    <Card
      hasListCard
      listCardHeading={getPrice(data)}
      listCardSubHeading={getMarketingMode(data)}
      listCardItems={[
        {
          listCardItemHeading: 'Negotiator',
          listCardItemSubHeading: getAgencyName(NegotiatorData!),
          listCardItemIcon: 'applicantInfographic',
          onClick: () => handleNegotiatorModal(NegotiatorData?.GetNegotiatorById.id!),
        },
      ]}
    />
  )
}

export default PropertyBox
