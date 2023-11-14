import React from 'react'
import styled from 'styled-components';


function UserMovieList  (){
  return (
    <MovieListWrapper>영화 리스트</MovieListWrapper>
  )
}

export default UserMovieList

const MovieListWrapper = styled.section`
  background-color: lightcyan;
`