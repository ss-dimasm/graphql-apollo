import { gql } from '@apollo/client'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { PROPERTIES_MODEL } from '../fragments/property/properties-model'

export type PropertiesListQueryVariables = {
  negotiatorId?: string[]
  propertyId?: string[]
  pageSize?: number
}

export type PropertiesListQueryData = {
  GetProperties: {
    pageNumber: number
    pageSize: number
    pageCount: number
    totalCount: number
    _links: string
    _embedded: PropertyModel[]
  }
}

export const GET_PROPERTIES = gql`
  ${PROPERTIES_MODEL}
  query GetProperties($pageSize: Int) {
    GetProperties(pageSize: $pageSize) {
      _embedded {
        ...PropertiesEmbed
      }
    }
  }
`
