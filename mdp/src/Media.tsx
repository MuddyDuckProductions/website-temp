import React from 'react';
import YouTube from './YouTube';

const Media = () => {
  return (
    <>
      <h1
        style={{
          maxWidth: '100%',
          margin: '0 auto 20px',
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#eeee24',
        }}
      >
        Media
      </h1>

      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          padding: '0 20px',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          justifyItems: 'center',
          alignItems: 'start',
        }}
      >
        <YouTube />
        <div
          style={{
            width: '300px',
            height: 'auto',
            backgroundColor: '#333',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Second Card Placeholder
        </div>
      </div>
    </>
  );
};

export default Media;
