import styled from 'styled-components'
import Layout from '../components/shared/layout'
import { color, breakpoint } from '../styles/theme'
const { background } = color
import InviteLetter from '../components/shared/invite-letter'
import ArticleYaoJeoTo from '../components/landing/article-yao-jen-to'
import { CANDIDATES_LETTER } from '../constants'

const Main = styled.main``
const Wrapper = styled.section`
  background-color: ${background.gray};
  padding: 40px 20px;
  margin: 0 auto;
  ${breakpoint.xl} {
    padding: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`
export default function Home() {
  return (
    <>
      <Layout>
        <Main>
          <Wrapper>
            {CANDIDATES_LETTER.map((person) => (
              <InviteLetter
                key={person.id}
                id={person.id}
                name={person.name}
                description={person.letterDescription}
                image={person.letterAvatar}
              ></InviteLetter>
            ))}
          </Wrapper>
          <ArticleYaoJeoTo />
        </Main>
      </Layout>
    </>
  )
}