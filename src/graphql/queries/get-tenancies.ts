import { gql } from '@apollo/client'
import { TenancyModel } from '@reapit/foundations-ts-definitions'
import { TENANCIES_MODEL } from '../fragments/tenancies-model'

export type TenanciesListQueryVariables = {
  negotiatorId?: string[]
  propertyId?: string[]
}

export type TenanciesListQueryData = {
  GetTenancies: {
    pageNumber: number
    pageSize: number
    pageCount: number
    totalCount: number
    _links: string
    _embedded: TenancyModel[]
  }
}

export const GET_TENANCIES = gql`
  ${TENANCIES_MODEL}
  query GetTenancies($negotiatorId: [String!], $propertyId: [String!]) {
    GetTenancies(negotiatorId: $negotiatorId, propertyId: $propertyId) {
      pageNumber
      pageSize
      pageCount
      totalCount
      _links
      _embedded {
        ...TenancyModel
      }
    }
  }
`
