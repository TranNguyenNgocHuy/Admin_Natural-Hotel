import styled from 'styled-components'
import { HiOutlineUser } from 'react-icons/hi2'

import ButtonIcon from './ButtonIcon'
import Logout from '../features/authentication/Logout'
import { useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const HeaderStyled = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <HeaderStyled>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </HeaderStyled>
  )
}

export default HeaderMenu
