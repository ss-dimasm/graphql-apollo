import { gql } from '@apollo/client'

export const TENANCIES_MODEL = gql`
  fragment TenancyModel on TenancyModel {
    id
    created
    modified
    startDate
    endDate
    status
    agentRole
    rent
    rentFrequency
    endDateConfirmed
    isPeriodic
    rentInstalmentsFrequency
    rentInstalmentsAmount
    rentInstalmentStart
    meterReadingGas
    meterReadingGasLastRead
    meterReadingElectricity
    meterReadingElecticityLastRead
    meterReadingWater
    meterReadingWaterLastRead
    typeId
    negotiatorId
    propertyId
    applicantId
    fromArchive
    _eTag
    _links
  }
`
