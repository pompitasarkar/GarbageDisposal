import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng, LatLngBounds } from 'leaflet';
import LocateControl from './LocateControl';

class GarbageDisposalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null
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
          title: 'Show me where I am, yo!'
      },
      onActivate: () => {} // callback before engine starts retrieving locations
    }
    const southWest = new LatLng(20.712, 10);
    const northEast = new LatLng(60.774, 10);
    const bounds = new LatLngBounds(southWest, northEast);
    const binPoints = [
      {
        lat: 12.947362445113066,
        lng: 77.6891255061506,
        img: 'garbage1.png' 
      },
      {
        lat: 12.847362445113067,
        lng: 77.6891255061507,
        img: 'garbage2.png' 
      },
      {
        lat: 12.747362445113065,
        lng: 77.6891255061515,
        img: 'garbage3.png' 
      },
    ];
    return (
      <LeafletMap
        center={this.state.currentPos}
        // zoom={5}
        maxZoom={20}
        minZoom={5}
        // maxBounds={bounds}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        onClick={this.handleClick}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { 
          binPoints.map((value, index) => {
            const position = [value.lat, value.lng];
            console.log(position);
            return(
              <Marker key={index} position={position} draggable={true}>
                <Popup>
                  Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
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