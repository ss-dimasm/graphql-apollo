import { gql } from '@apollo/client'

export const PROPERTY_MODEL_SELLING = gql`
  fragment PropertyModelSelling on PropertyModelSelling {
    price
  }
`
