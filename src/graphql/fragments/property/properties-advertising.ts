import { gql } from '@apollo/client'

export const UPDATE_ADVERTISING_MODEL = gql`
  fragment UpdateAdvertising on PropertyModel {
    internetAdvertising
  }
`
