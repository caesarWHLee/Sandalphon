import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: calc((110% - 284px) / 2);
  width: 100%;
  height: 284px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 930px) {
    top: 30%;
    height: unset;
  }
  @media (max-width: 568px) {
    top: 29%;
  }
  @media (max-height: 300px) {
    top: 22%;
  }
`

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 1.5;
  white-space: pre-wrap;

  @media (max-width: 930px) {
    font-size: 20px;
    line-height: 30px;
  }
`

const Description = styled.div`
  margin-top: 37px;
  width: 705px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 930px) {
    font-size: 12px;
    line-height: 18px;
    width: 400px;
    margin-top: 15px;
  }
`

const Credit = styled.div`
  margin-top: 45px;
  width: 645px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  b {
    font-weight: 900;
  }

  @media (max-width: 930px) {
    font-size: 12px;
    line-height: 18px;
    margin-top: 53px;
    width: 400px;
    ${({ lang }) =>
      lang === 'en'
        ? `
      margin-top: 38px;
    `
        : ''}
  }
  @media (max-width: 568px) {
    margin-top: 27px;
    ${({ lang }) =>
      lang === 'en'
        ? `
      margin-top: 16px;
    `
        : ''}
  }
  @media (max-height: 300px) {
    margin-top: 12px;
  }
`

const IG = styled.a`
  display: block;
  margin-top: 16px;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 930px) {
    display: none;
  }
`

const MobileIG = styled.a`
  display: none;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 930px) {
    display: block;
    position: absolute;
    top: 16px;
    left: 80px;
    width: 16px;
    height: 16px;
  }
  @media (max-width: 568px) {
    left: 76px;
  }
`

export default function Landing({ title, description, credit, ig }) {
  const {
    i18n: { language },
  } = useTranslation()
  return (
    <>
      <Wrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Credit lang={language}>
          <b>{credit}</b>
        </Credit>
        <IG href={ig} target="_blank">
          <img src="images/ig.svg" alt="instagram link" />
        </IG>
      </Wrapper>
      <MobileIG href={ig} target="_blank">
        <img src="images/ig.svg" alt="instagram link" />
      </MobileIG>
    </>
  )
}
