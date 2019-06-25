import styled from 'styled-components'

export const Stripe = styled.div`
  height: auto;
  flex: ${({ size }) => `${size} ${size} 0`};
  width: 100%;
  background-color: ${({ color }) => color};
  transition: flex 0.2s, background-color 0.4s;
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
