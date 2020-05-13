import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MdDashboard, MdMenu, MdCreate } from 'react-icons/md'
import UserContext from 'Context/UserContext'
import { FaHandHoldingHeart, FaUser } from 'react-icons/fa'
import ButtonIcon from 'components/commons/ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import styles from './buttonsMenuNavBar.scss'

const routesUserProtectionist = [
  {
    icon: <FaUser size={22} />,
    text: 'My profile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'Search volanteers',
    link: '/search-volanteers',
  },
  {
    icon: <MdCreate size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
]

const routesUserAdopter = [
  {
    icon: <FaUser size={22} />,
    text: 'My profile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
]

const routesUserTransitUser = [
  {
    icon: <FaUser size={22} />,
    text: 'My profile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
]

const ButtonsMenuNavBar = ({ handleMenu }) => {
  const [toggleViewMenuUser, setHandleToggleViewMenuUser] = useState(false)
  const [menuUser, setMenuUser] = useState([])
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const initMenuUser = useCallback(() => {
    if (authStore.user.rol === 'protectionist') {
      setMenuUser(routesUserProtectionist)
    }
    if (authStore.user.rol === 'adopter') {
      setMenuUser(routesUserAdopter)
    }
    if (authStore.user.rol === 'transitUser') {
      setMenuUser(routesUserTransitUser)
    }
  }, [])

  const handleToggleViewMenuUser = useCallback(() => {
    setHandleToggleViewMenuUser(!toggleViewMenuUser)
  })

  useEffect(() => {
    initMenuUser()
  }, [])

  return (
    <>
      <div className={styles.containerButton}>
        <ButtonIcon onclick={handleToggleViewMenuUser} icon={<MdMenu size={25} />} />
      </div>
      <ToggleNavegationUser
        routesUser={routesUserProtectionist}
        handleToggleViewMenuUser={handleToggleViewMenuUser}
        toggleViewMenuUser={toggleViewMenuUser}
      />
      {menuUser.map(route => (
        <div key={route.link} className={styles.containerLinks}>
          <LinkNavbarUser
            haveId={route.haveId}
            id={authStore.user._id}
            link={route.link}
            text={route.text}
            icon={route.icon}
            handleMenu={handleMenu}
          />
        </div>
      ))}
    </>
  )
}

ButtonsMenuNavBar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
}

export default ButtonsMenuNavBar
