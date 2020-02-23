import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import MapStyles from '../styles/Style.css';

const MapStyle = {
    width: '100%',
    height: '50%',
    padding: '5%',
    margin: '0',
    marginTop: '0'

};

export class MapComponent extends Component {
  
    state = {
        showingInfoWindow: true,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
};

    render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={MapStyle}
        initialCenter={{
         lat: 41.391296,
         lng: 2.193439
        }}>
            <Marker
          onClick={this.onMarkerClick}
          name={'La Bohème Cafè'}
        />
         <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
            <div>
                <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>


        </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxGWQTI_kwg_WesFRQE3bCCDWfaDxZock'
})(MapComponent);