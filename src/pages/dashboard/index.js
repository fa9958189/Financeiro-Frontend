import React from 'react';
import './styles.css';
import backgroundImg from '../../assets/img/capa.png'; // corrigir o caminho da imagem
import Menu from '../../componente/Menu';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className='menu'>
                <Menu />
            </div>
            <div className='principal'>
                <h1>Página Principal</h1>
                <img src={backgroundImg} alt="Imagem de fundo" className="capa-image" />
            </div>
        </div>
    );
}
