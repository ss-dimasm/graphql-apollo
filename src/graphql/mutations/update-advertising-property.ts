import { gql } from '@apollo/client'
import { UPDATE_ADVERTISING_MODEL } from '../fragments/property/properties-advertising'

export type UpdateAdvertisingPropertiesListQueryVariables = {
  id: string
  internetAdvertising: boolean
  _eTag: string
}

export type UpdateAdvertisingPropertiesListQueryData = {
  id: string
  internetAdvertising: boolean
}

export const UPDATE_ADVERTISING_PROPERTY = gql`
  ${UPDATE_ADVERTISING_MODEL}
  mutation UpdateAdvertisingProperty($id: String!, $_eTag: String!, $internetAdvertising: Boolean!) {
    UpdateProperty(id: $id, _eTag: $_eTag, internetAdvertising: $internetAdvertising) {
      id
      ...UpdateAdvertising
    }
  }
`
