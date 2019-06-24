import styled from 'styled-components'
import { max } from './Rainbow'

export const Stripe = styled.div`
  height: auto;
  flex: 1 1 0;
  width: 100%;
  background-color: ${({ color }) => color};
  transition: transform 0.2s, background-color 0.4s;
  margin: -0.5px 0;
`

export const SubWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: scaleY(${({ length }) => max / length});
  transition: transform 0.2s;
`

export const Wrapper = styled.div`
  overflow: hidden;
  width: auto;
  height: 100%;
  position: relative;

  > :not(${SubWrapper}) {
    position: relative;
  }
`
