import React from 'react';
import styled from 'styled-components';

function UserInfo() {
  return (
    <UserInfoWrapper>
      <div>OOO님의 마이페이지</div>
      <div>선호하는 장르</div>
    </UserInfoWrapper>
  );
}

export default UserInfo;

const UserInfoWrapper = styled.section`
  background-color: lightcoral;
`;
