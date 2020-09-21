import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Card, Layout, Menu, } from 'antd'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { CoordinatesControl } from 'react-leaflet-coordinates'
import { debounce } from 'lodash'
import L from 'leaflet'
import icon from './assets/marker.svg'
const { Header, Content } = Layout

//URL Basemap OpenStreetMap
const urlTile_OSM = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

//Marker Icon
const MarkerIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

// Custom Component Marker with Open Popup
const MarkerCenter = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }
  return <Marker ref={initMarker} {...props} />
}

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 5,
      markerCenter: [0, 0],
      descriptionMarker: `Coordinates Center of View`,
      LatMarker: `Lat: 0`,
      LngMarker: `Lng: 0`
    }
    this.ongetCenterMove = debounce(this.ongetCenterMove.bind(this), 1500)
  }

  ongetCenterMove = async () => {
    let center = this.refs.map.leafletElement.getCenter()
    let zoom = this.refs.map.leafletElement.getZoom()
    let lat = center.lat
    let lng = center.lng

    this.setState({
      markerCenter: [lat, lng],
      descriptionMarker: `Coordinates Center of View`,
      LatMarker: `Lat: ${lat}`,
      LngMarker: `Lng: ${lng}`,
      zoom: zoom
    })
  }

  render() {
    const { zoom, markerCenter, descriptionMarker, LatMarker, LngMarker } = this.state
    return (
      <>
        {/* Dynamic Title Page */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>React Leaflet Get Center of View Map</title>
        </Helmet>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">
                <a href='https://www.wenesia.com' target="_blank" rel="noopener noreferrer">WeNesia - Web Hosting Singapore</a>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Card>
                <Map ref='map' center={markerCenter} zoom={zoom} onmoveend={this.ongetCenterMove} onzoomend={this.ongetCenterMove} style={{ width: '100%', height: '587px' }}>
                  <TileLayer
                    attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    url={urlTile_OSM}
                  />
                  <MarkerCenter position={markerCenter} icon={MarkerIcon}>
                    <Popup>
                      {descriptionMarker}<hr />
                      {LatMarker}<br />
                      {LngMarker}
                    </Popup>
                  </MarkerCenter>
                  <CoordinatesControl
                    coordinates="decimal"
                    position="bottomleft"
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      color: '#001529'
                    }}
                  />
                </Map>
                <div align="center" style={{ marginTop: '10px', marginBottom: '-10px' }}>
                  <i className="fa fa-copyright"></i> 2020 <i className="fa fa-code"></i> with <i className="fa fa-heart"></i> By Ryfan Aditya Indra at Kabupaten Tangerang
                </div>
              </Card>
            </div>
          </Content>
        </Layout>
      </>
    )
  }
}

export default (App)