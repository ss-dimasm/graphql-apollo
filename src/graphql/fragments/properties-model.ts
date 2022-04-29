import { gql } from '@apollo/client'

export const PROPERTIES_MODEL = gql`
  fragment PropertiesEmbed on PropertyModel {
    id
    _eTag
  }
`
