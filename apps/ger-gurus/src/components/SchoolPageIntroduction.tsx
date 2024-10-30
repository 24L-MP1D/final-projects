export const SchoolPageIntroduction = () => {
    return (
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the video covers the container
          }}
        >
          <source src="
          /video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '2rem',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Your Overlay Text Here
        </div>
      </div>
    );
  };
   