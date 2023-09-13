import styled from 'styled-components';
import Icon from "../../public/navigator.png"

type NavigatorProps = {
  direction: "prev"|"next";
}

export function PageNavigatorButton({direction}:NavigatorProps) {
  return <>
  <NavigatorBox direction={direction}/>
  </>;
}


const NavigatorBox = styled.div<NavigatorProps>`
cursor: pointer;
width: 45px;
height: 45px;
border-radius: 100%;
background: url(${Icon.src}) no-repeat ${props=>props.direction==="prev"?"50% 18%":"50% 84%"};;

`