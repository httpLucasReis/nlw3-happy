import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer, } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from "react-icons/fi";
import mapMarkerImg from '../images/map-mark.svg';
import '../styles/pages/create-orphanage.css';

// Importando utils
import mapIcon from '../utils/mapIcon';

// Importando componentes
import Sidebar from '../components/Siderbar';

// Importando a API
import api from '../services/api';

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude: 0}); 

  // Trabalhando com os formulários a partir da alteração de estados 
  const [name, setName] = useState('');
  const [about, setAbout]  = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([])
  
  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;
  
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    // Setando manualmente os dados no formulário -> multipart form
    data.append('name', name);
    data.append('about', String(about));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    // Enviando uma imagem por vez
    images.forEach((image)=>{
      data.append('images',image);
    })

    await api.post('orphanages', data)
    
    alert('Cadastro realizado com sucesso');

    history.push('/app');


  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image)=>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      
      <Sidebar/>
      
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick = {handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude != 0? 
                  (<Marker 

                    interactive={false} 
                    icon={mapIcon} 
                    position={[
                      position.latitude,position.longitude
                    ]} 

                  />) : null
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                  id="name" 
                  maxLength={300} 
                  value={about} 
                  onChange={event => setAbout(event.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              
              <div className="images-container">
                {previewImages.map((image)=>{
                    return (
                      <img key ={image} src={image} alt="name" />
                    )
                })}  

                <label htmlFor="image[]"className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                onChange = {handleSelectImages}
                type="file" 
                id="image[]">
              </input>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" 
                value={opening_hours} 
                onChange={(event) => setOpening_hours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className= {open_on_weekends? 'active' : ''}
                  onClick = {()=>{
                    setOpen_on_weekends(true);
                  }}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className = {!open_on_weekends? 'active': ''}
                  onClick = {()=>{
                    setOpen_on_weekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
