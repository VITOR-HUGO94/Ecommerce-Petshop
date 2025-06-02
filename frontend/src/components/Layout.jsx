import React from 'react'
import backgroundImage from '../img/top-view-pet-food-with-toys.jpg' // ajuste o caminho conforme necessário

const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Plano de fundo desfocado e clareado */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.5)', // aumenta brilho reduzindo contraste
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
      {/* Overlay branco semitransparente para embranquecer ainda mais */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Conteúdo principal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

export default Layout
