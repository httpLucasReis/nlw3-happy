import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import mapMarkerImg from "../images/map-mark.svg";
import "../styles/components/sidebar.css";

export default function Sidebar(){
    const { goBack } = useHistory();
    return (
        <aside className="app-side">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
            <button type="button" onClick= {goBack} >
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
      </aside>
    )
}

// Abstraindo componentes 
// Isso permite que um componente que não se altera seja reaproveitado.