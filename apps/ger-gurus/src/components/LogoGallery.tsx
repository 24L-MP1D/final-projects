import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe for continuous scrolling effect
const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);  // Move the logos to the left
  }
`;

// Styled components
const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%; // Full width to make it responsive
  position: relative;
  margin-top: 50px;
   padding-bottom: 10px;`;
   

const ScrollingCarousel = styled.div`
  display: flex;
  animation: ${scrollAnimation} 20s linear infinite;  // Infinite scroll (adjust speed here)
  white-space: nowrap;
`;

const LogoContainer = styled.div`
  display: inline-block;
  margin-right: 80px;  // Space between logos (gap of 80px)
  width: 200px;        // Define the width of each logo container (adjust as needed)
  height: 60px;        // Define the height of each logo container (adjust as needed)
  position: relative;  // To make sure the images fill the container properly
`;

const LogoImage = styled.img<{ isHovered: boolean }>`
  width: 100%;         // Make image fill the container's width
  height: 100%;        // Make image fill the container's height
  object-fit: contain; // Preserve aspect ratio while filling the container
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ isHovered }) => (isHovered ? 'scale(1.2)' : 'scale(1)')};
  opacity: ${({ isHovered }) => (isHovered ? 0.7 : 1)};
`;

// 20 Global logo links (URLs pointing to external images)
const globalLogoLinks = [
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/6716504b8e03da491ad986f5_LOGO-TRANSPARENT.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/6716504ffd8613763702f223_Good%20%26%20Proper%20Logo.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/66a39b660fe233de5f010b54_Lestrange%20logo.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/65cc855bb24174b77269f1a6_nice.svg",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/66fd673982014c69f8a62243_Dr%20Will%27s%20Logo.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/66a3610749b3820e5723ee35_hylo.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/65cc834abd58d205867e0389_manors.svg",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/66a39b5b35d9d4841a9f9d8d_Homethings%20logo.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/66a39a5517dbbbc3e40b1832_Citizens%20logo-p-500.png",
  "https://cdn.prod.website-files.com/635273ea37c256ef2835d522/65cc834a42d58de33d62b333_nue%20co.svg",
];

// Function to generate logos (with the global URLs)
const generateLogos = () => {
  return globalLogoLinks.map((link, index) => ({
    src: link,  // Use the external URLs directly for the logo images
    alt: `Logo ${index + 1}`,
    link: link  // Each logo has its associated link
  }));
};

const LogoGallery: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate logos with the global URLs
  const logos = generateLogos();

  return (
    <main className='max-w-[1250px] mx-auto'>
    <CarouselContainer 
      onMouseEnter={() => setIsHovered(true)}  // Hover to trigger animation
      onMouseLeave={() => setIsHovered(false)}  // Mouse leave to reset animation
    >
      <ScrollingCarousel>
        {/* Loop through logos to create the scrolling effect */}
        {logos.map((logo, index) => (
          <LogoContainer key={index}>
            <a href={logo.link} target="_blank" rel="noopener noreferrer">
              <LogoImage src={logo.src} alt={logo.alt} isHovered={isHovered} />
            </a>
          </LogoContainer>
        ))}
        {/* Duplicate the logos to ensure continuous scrolling */}
        {logos.map((logo, index) => (
          <LogoContainer key={`dup-${index}`}>
            <a href={logo.link} target="_blank" rel="noopener noreferrer">
              <LogoImage src={logo.src} alt={logo.alt} isHovered={isHovered} />
            </a>
          </LogoContainer>
        ))}
      </ScrollingCarousel>
    </CarouselContainer>
    <div className="mt-2 border-green-500 border-t" />
    </main>
  );
};

export default LogoGallery;
