import { gql } from '@apollo/client'

import { PROPERTY_MODEL_ADDRESS } from './property-model-address'
import { PROPERTY_MODEL_LETTING } from './property-model-letting'
import { PROPERTY_MODEL_SELLING } from './property-model-selling'

export const PROPERTIES_MODEL = gql`
  ${PROPERTY_MODEL_ADDRESS}
  ${PROPERTY_MODEL_SELLING}
  ${PROPERTY_MODEL_LETTING}

  fragment PropertiesEmbed on PropertyModel {
    id
    _eTag
    internetAdvertising
    marketingMode
    currency
    address {
      ...PropertyModelAddress
    }
    selling {
      ...PropertyModelSelling
    }
    letting {
      ...PropertyModelLetting
    }
  }
`
