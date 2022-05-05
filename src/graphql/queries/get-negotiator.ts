import { gql } from '@apollo/client'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'

export type NegotiatorListVariables = {
  id: string
}

export type NegotiatorListQuery = {
  GetNegotiatorById: NegotiatorModel
}

export const GET_SINGLE_NEGOTIATOR = gql`
  query GetNegotiatorById($id: String!) {
    GetNegotiatorById(id: $id) {
      id
      name
      created
      jobTitle
      active
      officeId
      workPhone
      mobilePhone
      email
    }
  }
`
