import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Logo from '../public/MovieDogLogo.png';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

import ConfirmButton from './buttons/ConfirmButton';
import SearchBar from './input/SearchBar';
import ModeButton from './buttons/ModeButton';
import { useRecoilState } from 'recoil';
import { LoginsState } from '@/stores/LoginState';

export function Header() {
  const router = useRouter();
  const [isTabBarShowing, setIsTabBarShowing] = useState(true);

  const [isLogin, setIsLogin] = useRecoilState(LoginsState);

  useEffect(() => {
    const isLogin = window.localStorage.getItem('userData');
    if (!isLogin) {
      return;
    }
    setIsLogin(true);
  }, []);

  useEffect(() => {
    let lastScrollY = document.defaultView?.scrollY;

    const onScroll = () => {
      const presentScrollY = document.defaultView?.scrollY;

      if (lastScrollY !== undefined && presentScrollY !== undefined) {
        if (lastScrollY < presentScrollY) {
          setIsTabBarShowing(true);
        } else {
          setIsTabBarShowing(false);
        }
        lastScrollY = document.defaultView?.scrollY;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.addEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    const data = confirm('로그아웃하시겠습니까?');
    if (data) {
      window.localStorage.removeItem('userData');
      setIsLogin(false);
      location.reload();
    }
  };

  return (
    <HeaderBlock>
      <WrapperBlock>
        <FlexContainer className="left-block">
          <Link href="/">
            <LogoIMG src={Logo.src} alt="로고" />
          </Link>
          <nav className="pc-nav">
            <List>
              <ListItem>
                <Link href="/list/genre/28">장르별</Link>
              </ListItem>
              <ListItem>년도별</ListItem>
            </List>
          </nav>
        </FlexContainer>
        <FlexContainer className="right-block">
          <SearchBar className="pc-nav" />
          {isLogin === false ? (
            <Link href="/login">
              <ConfirmButton className="login-btn pc-nav" text="로그인" />
            </Link>
          ) : (
            <ConfirmButton
              onClick={logout}
              className="login-btn pc-nav"
              text="로그아웃"
            />
          )}
          <ModeButton mode="light" />
        </FlexContainer>
      </WrapperBlock>
      <TabBarBlock className={isTabBarShowing ? '' : 'hide'}>
        <ul>
          <li className={router.pathname === '/' ? 'active' : ''}>
            <MenuRoundedIcon fontSize="large" />
            <span>장르별</span>
          </li>
          <li className={router.pathname === '/search' ? 'active' : ''}>
            <SearchRoundedIcon fontSize="large" />
            <span>검색</span>
          </li>
          <li
            className={
              router.pathname === '/login' || router.pathname === '/my-page'
                ? 'active'
                : ''
            }
          >
            <PermIdentityRoundedIcon fontSize="large" />
            <span>로그인</span>
          </li>
        </ul>
      </TabBarBlock>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown5};

  .pc-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .pc-nav {
      display: block;
    }
  }
`;

const WrapperBlock = styled.div`
  display: flex;
  max-width: 1200px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;

  &.right-block {
    gap: 10px;
    justify-content: flex-end;
  }

  .login-btn {
    width: 120px;
  }
`;

const LogoIMG = styled.img`
  margin-right: 24px;

  @media (min-width: 800px) {
    margin-right: 48px;
  }
`;

const List = styled.ul``;

const ListItem = styled.li`
  margin-right: 10px;
  display: inline-block;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.headline3};

  a {
    color: ${({ theme }) => theme.colors.brown9};
  }

  @media (min-width: 800px) {
    margin-right: 40px;
  }
`;

const TabBarBlock = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 200;
  transition: all 0.5s;

  &.hide {
    bottom: -100%;
    transition: all 0.5s;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.gray1};

    svg {
      margin-bottom: 4px;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  li.active {
    color: ${({ theme }) => theme.colors.brown6};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
