import { gql } from '@apollo/client'

export const PROPERTY_MODEL_ADDRESS = gql`
  fragment PropertyModelAddress on PropertyModelAddress {
    buildingName
    buildingNumber
    line1
    line2
    line3
    line4
    postcode
    countryId
  }
`
