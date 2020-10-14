import leaflet from 'leaflet';
import mapMarkerImg from '../images/map-mark.svg';

const mapIcon = leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68], //// Qual posição representa o ponto.
  popupAnchor: [0, -60]
})

export default mapIcon;