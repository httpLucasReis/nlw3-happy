import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import '../styles/pages/orphanage-map.css'
import mapMarkerImg from '../images/map-mark.svg';
import Leaflet from 'leaflet';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';


// Importando utils
import mapIcon from '../utils/mapIcon';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    // Estados em react -> Ciclo de renderização
    // <> generic -> parâmetro de tipagem.
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    // react hooks (função, quando executar);
    useEffect(()=> {
        api.get('orphanages').then(res => {
            setOrphanages(res.data);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"></img>
                    <h2>Escola um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita</p>
                </header>

                <footer>
                    <strong>São Luís</strong>
                    <span>Maranhão</span>
                </footer>
            </aside>

            <Map
                center={[-2.5385864,-44.2551029]}
                zoom={13}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                            key={orphanage.id}
                            position={[orphanage.latitude, orphanage.longitude]}
                            icon={mapIcon}
                            >
                            <Popup 
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className='map-popup'  
                            >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                        )
                    })
                }
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;