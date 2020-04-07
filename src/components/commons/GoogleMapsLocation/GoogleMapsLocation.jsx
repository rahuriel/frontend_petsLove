import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import styles from './googleMapsLocation.scss'

const GoogleMapsLocation = observer(
  ({ google, location, phone, userName, email, title, showAddress }) => {
    const [activeMarker, setActiveMarker] = useState({})
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)

    const onMarkerClick = (map, marker) => {
      setActiveMarker(marker)
      setShowingInfoWindow(true)
    }
    console.log(location)
    return (
      <div className={styles.containerMap}>
        <Map
          google={google}
          zoom={15}
          initialCenter={location}
          className={styles.map}
          center={location}
        >
          <Marker onClick={onMarkerClick} position={location} />
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <div>
              {title && <div>{title}</div>}
              {!showAddress && <h6>{userName}</h6>}
              {!showAddress && <div>{email}</div>}
              {!showAddress && <div>{phone}</div>}
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
)

GoogleMapsLocation.propTypes = {
  location: PropTypes.string.isRequired,
  showAddress: PropTypes.bool,
  phone: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string,
}

GoogleMapsLocation.defaultProps = {
  phone: 'No have phone',
  email: 'Not have email',
  title: '',
  showAddress: false,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCG4to6zaiKQpUhXTPRnYWXcoJ8RxU5nps',
})(GoogleMapsLocation)
