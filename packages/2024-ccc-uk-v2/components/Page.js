import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Caption from './Caption'
import PageControl from './PageControl'
import Landing from './Landing'
import Ending from './Ending'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  scroll-snap-align: start;

  ${({ fakeLandscape }) =>
    fakeLandscape
      ? `
    height: 100vw;
    &:last-of-type {
      height: unset;
    }
  `
      : `
    height: 100vh;
  `}
`

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 7.5%;
  bottom: 30px;
  margin: auto;
  height: 50%;
  max-width: 52%;

  @media (max-width: 930px) {
    left: 0;
    top: 0;
    bottom: 0;
    height: 71%;
    max-width: 58%;
  }
  @media (max-width: 568px) {
    top: 0;
    left: 0;
    bottom: 10px;
    max-width: 54.9%;
    height: 55.3%;
  }

  ${({ noMapCationMode }) =>
    noMapCationMode &&
    `
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    max-width: unset;
    `}
`

const Image = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 7.5%;
  bottom: 0;
  margin: auto;

  @media (max-width: 930px) {
    left: 0;
    top: 0;
    bottom: 0;
    width: 58%;
  }
  @media (max-width: 568px) {
    top: 0;
    left: 0;
    bottom: 0;
    width: 54.9%;
  }
  @media (max-height: 300px) {
    @media (max-width: 930px) and (min-width: 569px) {
      height: 100%;
      width: unset;
    }
  }

  ${({ noMapCationMode }) =>
    noMapCationMode &&
    `
      top: 0 !important;
      left: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      `}
`

export default function Page({
  fakeLandscape,
  page,
  pageInfo,
  browsingIndex,
  navigateTo,
  showCaption,
  onClick,
  showingTutorial,
}) {
  const videoRef = useRef(null)
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const { id, type, image } = page

  useEffect(() => {
    if (type === 'M' && videoRef.current) {
      if (browsingIndex === page.id) {
        setTimeout(() => {
          videoRef.current.play()
        }, 100)
      }
    }
  }, [browsingIndex, page.id, type])

  let photo = image
  if (type !== 'M') {
    const mmBaseUrl = 'https://v3-statics.mirrormedia.mg/images/'
    let suffix = ''
    if (width > 930) {
      suffix = '-w2400.webP'
    } else if (width > 568) {
      suffix = '-w1600.webP'
    } else {
      suffix = '-w800.webP'
    }
    photo = mmBaseUrl + image + suffix
  }

  let Media
  switch (type) {
    case 'M':
      window.id = id
      const isDesktop = width > 930
      const src = isDesktop ? photo.desktop : photo.mobile
      const noMapCationMode = !t(`${id}.text`)
      Media = isDesktop ? (
        <Video
          ref={videoRef}
          className="video"
          src={src}
          muted
          noMapCationMode={noMapCationMode}
        />
      ) : (
        <Image src={src} alt="map" noMapCationMode={noMapCationMode} />
      )
      break
    case 'L':
    case 'P':
      Media = <BackgroundImage src={photo} />
      break
    case 'E':
      Media = null
      break
    default:
      break
  }

  let Content
  if (type === 'L') {
    Content = (
      <Landing
        title={t(`${id}.text.title`)}
        description={t(`${id}.text.foreword`)}
        credit={t(`${id}.text.credit`)}
        ig={t(`${id}.text.ig`)}
      />
    )
  } else if (type === 'M') {
    const mapCaption = t(`${id}.text`)
    Content =
      showCaption && !!mapCaption ? (
        <Caption
          caption={t(`${id}.text`)}
          enlarge={type === 'M'}
          showingTutorial={showingTutorial}
          index={id}
        />
      ) : null
  } else if (type === 'E') {
    Content = <Ending id={id} image={photo} />
  } else {
    Content = showCaption ? (
      <Caption
        caption={t(`${id}.text`)}
        enlarge={type === 'M'}
        showingTutorial={showingTutorial}
        index={id}
      />
    ) : null
  }

  return (
    <Wrapper
      fakeLandscape={fakeLandscape}
      onClick={type === 'P' ? onClick : () => {}}
      className="page"
      id={`page - ${id} `}
      fixed={type !== 'E'}
    >
      {/* {type !== "E" && <BackgroundImage src={photo} />} */}
      {Media}
      {Content}
      <PageControl
        pageInfo={pageInfo}
        goLast={() => {
          navigateTo(id - 1)
        }}
        goNext={() => {
          navigateTo(id + 1)
        }}
      />
    </Wrapper>
  )
}
