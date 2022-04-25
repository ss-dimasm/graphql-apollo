import React, { FC, useRef, useState } from 'react'
import { Title, PageContainer, FlexContainer } from '@reapit/elements'
import { useQuery } from '@apollo/client'
import { GET_TENANCIES, TenanciesListQueryData, TenanciesListQueryVariables } from '../../graphql/queries/get-tenancies'

export const HomePage: FC = () => {
  const [searchedNegotiatorIdVariable, setSearchedNegotiatorIdVariable] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const { loading, data } = useQuery<TenanciesListQueryData, TenanciesListQueryVariables>(GET_TENANCIES, {
    variables: {
      negotiatorId: searchedNegotiatorIdVariable!,
    },
  })

  const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchedNegotiatorIdVariable((prevState) => [...prevState, inputRef!.current!.value!])
  }

  return (
    <PageContainer>
      <Title>Welcome To Reapit Foundations</Title>
      <FlexContainer isFlexJustifyBetween>
        <div>
          <h1>GraphQL is loading: {loading ? 'true' : 'false'}</h1>
          <h2>Currently looking tenancy based negotiator ID:</h2>
          {searchedNegotiatorIdVariable.length !== 0 && (
            <>
              {searchedNegotiatorIdVariable.map((neg, index) => {
                return (
                  <React.Fragment key={index}>
                    <h4>{neg}</h4>
                  </React.Fragment>
                )
              })}
            </>
          )}
        </div>
        <form onSubmit={(e) => onSearchHandler(e)}>
          <FlexContainer>
            <div>
              <input ref={inputRef} type="text" name="agent-id" placeholder="search by agent id" />
            </div>
            <div>
              <button type="submit">Search</button>
            </div>
          </FlexContainer>
        </form>
      </FlexContainer>
      <hr />
      {!loading && (
        <div>
          <h2>GraphQL Data</h2>
          {data?.GetTenancies?._embedded.map((tenancy) => {
            return (
              <React.Fragment key={tenancy.id}>
                <h1>Tenancy ID: {tenancy?.id}</h1>
                <h3>Agent Role: {tenancy?.agentRole}</h3>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </PageContainer>
  )
}

export default HomePage
