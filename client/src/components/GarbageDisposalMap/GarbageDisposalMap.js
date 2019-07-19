import React from 'react';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { LatLng, LatLngBounds, Icon } from 'leaflet';
import LocateControl from './LocateControl';

class GarbageDisposalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }

  render() {
    const locateOptions = {
      position: 'topright',
      strings: {
        title: 'Show me where I am, yo!',
      },
      onActivate: () => {}, // callback before engine starts retrieving locations
    };
    const myIcon = new Icon({
      iconUrl: 'my-icon.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });
    const binPoints = [
      {
        lat: 12.947362445113066,
        lng: 77.6891255061506,
        img: 'garbage1.png',
      },
      {
        lat: 12.847362445113067,
        lng: 77.6891255061507,
        img: 'garbage2.png',
      },
      {
        lat: 12.747362445113065,
        lng: 77.6891255061515,
        img: 'garbage3.png',
      },
    ];
    return (
      <LeafletMap
        center={this.state.currentPos}
        // zoom={5}
        maxZoom={20}
        minZoom={5}
        // icon={myIcon}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        easeLinearity={0.35}
        onClick={this.handleClick}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {
          binPoints.map((value, index) => {
            const position = [value.lat, value.lng];
            console.log(position);
            return (
              <Marker key={index} position={position} draggable>
                <Popup>
                  Current location:
                  {' '}
                  <pre>{JSON.stringify(position, null, 2)}</pre>
                </Popup>
              </Marker>
            );
          })
        }
        {/* <Marker position={this.state.currentPos} draggable={true}>
          <Popup position={this.state.currentPos}>
          Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
          </Popup>
        </Marker> */}
        <LocateControl options={locateOptions} startDirectly onClick={this.handleClick}>
          {/* <Marker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
            Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </Marker> */}
        </LocateControl>
      </LeafletMap>
    );
  }
}

export default GarbageDisposalMap;
