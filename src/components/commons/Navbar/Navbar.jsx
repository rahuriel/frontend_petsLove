import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import Tooltip from '@material-ui/core/Tooltip'
import { MdSearch } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { SEARCH_PETS, LOGIN, REGISTER, LANDING_PAGE } from 'routing/routes'
import ChangeLanguage from 'components/ChangeLanguage'
import UserContext from 'Context/UserContext'
import ButtonLink from 'components/commons/ButtonLink'
import MenuProfile from 'components/commons/MenuProfile'
import ImageUserLog from 'components/commons/ImageUserLog'
import ButtonIcon from 'components/commons/ButtonIcon'
import Loading from '../Loading/Loading'
import ToggleMenuUser from './ToggleMenuUser/ToggleMenuUser'
import styles from './navbar.scss'

const Navbar = ({ children }) => {
  const { t } = useTranslation('navbar')
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const [toggleNavegationUser, setToggleNavegationUser] = useState(false)
  const [viewMenuProfile, setViewMenuProfile] = useState(true)

  const goToHome = useCallback(() => history.push(LANDING_PAGE))
  const goToLogin = useCallback(() => history.push(LOGIN))
  const goToRegister = useCallback(() => history.push(REGISTER))

  const handleToggleMenu = useCallback(() => {
    setViewMenuProfile(!viewMenuProfile)
  })

  const handleMenu = useCallback((link, id, haveId) => {
    if (haveId) {
      history.push('/')
      history.push(`${link}/${id}`)
      return
    }
    history.push(link)
  }, [])

  const goToSeach = useCallback(() => {
    history.push(SEARCH_PETS)
  }, [])

  if (rootStore.authStore.isLoading) {
    return <Loading loadingRing />
  }

  /* Language is comment, please not delete. Thanks */
  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.buttonSearch}>
          {/* When user is login show menu user */}
          {rootStore.authStore.isLogin && (
            <ToggleMenuUser
              handleMenu={handleMenu}
              toggle={toggleNavegationUser}
              handleToggle={setToggleNavegationUser}
            />
          )}
          {/* This is button for go to search protectionist with google maps */}
          <Tooltip arrow title={t('home')} aria-label={t('home')} placement="bottom">
            <div>
              <ButtonIcon onclick={goToHome} icon={<AiFillHome size={22} />} />
            </div>
          </Tooltip>
          <Tooltip arrow title={t('searchPets')} aria-label={t('searchPets')} placement="bottom">
            <div>
              <ButtonIcon onclick={goToSeach} icon={<MdSearch size={25} />} />
            </div>
          </Tooltip>
        </div>
        {rootStore.authStore.isLogin ? (
          <>
            {/* This container id Image user login and change language */}
            <div className={styles.containerProfile}>
              <div className={styles.containerLanguage}>
                <ChangeLanguage />
              </div>
              <div className={styles.contectImageUser}>
                <ImageUserLog
                  handleToggleMenu={handleToggleMenu}
                  isUserLogin={rootStore.authStore.isLogin}
                  imagePreview={rootStore.authStore.imagePreview}
                />
                {authStore.isLoading ? (
                  <Loading loadingRing />
                ) : (
                  <MenuProfile
                    userId={authStore.user._id}
                    handleToggleMenu={handleToggleMenu}
                    viewMenuProfile={viewMenuProfile}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          // if user is logged out view Login and Sign In buttons
          <div className={styles.containerButtonslogin}>
            <div className={styles.navbarLink}>
              <ButtonLink onclick={goToLogin} text={t('login')} />
            </div>
            <div className={styles.navbarLink}>
              <ButtonLink onclick={goToRegister} text={t('common:signUp')} />
            </div>
            <div className={styles.containerLanguage}>
              <ChangeLanguage />
            </div>
          </div>
        )}
      </div>
      {children}
    </>
  )
}

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default observer(Navbar)
