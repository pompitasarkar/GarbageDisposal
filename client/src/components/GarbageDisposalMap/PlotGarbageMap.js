import * as React from 'react';
import { LatLng, LatLngBounds } from 'leaflet';
import {
  Map, TileLayer, CircleMarker, Popup,
} from 'react-leaflet';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 6,
      markers: [],
    };
    this.allMarkers = null;
    this.mapRef = React.createRef();
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  generateMarkers(count, bounds) {
    const minLat = bounds.getSouthWest().lat;


    const rangeLng = bounds.getNorthEast().lat - minLat;


    const minLng = bounds.getSouthWest().lng;


    const rangeLat = bounds.getNorthEast().lng - minLng;

    const result = Array.from({ length: count }, (v, k) => {
      return new LatLng(
        minLat + Math.random() * rangeLng,
        minLng + Math.random() * rangeLat,
      );
    });
    return result;
  }

  componentDidMount() {
    const southWest = new LatLng(30.0, -20.0);


    const northEast = new LatLng(60.0, 20.0);


    const bounds = new LatLngBounds(southWest, northEast);
    this.allMarkers = this.generateMarkers(20000, bounds);
    this.displayMarkers();
  }

  displayMarkers() {
    const map = this.mapRef.current.leafletElement;
    const markers = this.allMarkers.filter(m => map.getBounds().contains(m));
    console.log(this.allMarkers);
    this.setState({
      markers,
    });
  }

  render() {
    const markers = this.state.markers.map((v, i) => (
      <CircleMarker key={i} center={v} radius={3} />
    ));
    return (
      <Map
        onMoveEnd={this.displayMarkers}
        preferCanvas={false}
        ref={this.mapRef}
        center={new LatLng(51.505, -0.09)}
        zoom={this.state.zoom}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers}
      </Map>
    );
  }
}
