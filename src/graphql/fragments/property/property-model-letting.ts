import { gql } from '@apollo/client'

export const PROPERTY_MODEL_LETTING = gql`
  fragment PropertyModelLetting on PropertyModeLetting {
    rent
  }
`
