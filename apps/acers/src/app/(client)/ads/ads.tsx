'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Ads {
  name: string;
  id: string;
  images: string[];
  link: string;
}

interface AdvertisementProps {
}

export default function Advertisement({}: AdvertisementProps) {
  const [ads, setAds] = useState<Ads | null>(null);
  const [adsHover, setAdsHover] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const adId = '672cefd1067e949c17ce3650';

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.post('/api/advertisement', {
          _id: adId,
        });
        setAds(response.data);
        console.log('Fetched Ads:', response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, [adId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!isHovered && ads?.images?.length) {
      const interval = setInterval(() => {
        setAdsHover((prev) => (prev === ads.images.length - 1 ? 0 : prev + 1));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [ads?.images, isHovered]);

  const handleAdClick = () => {
    if (ads?.link) {
      window.open(ads.link, '_blank');
    }
  };

  return (
    <div className="ad-section relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleAdClick}>
      {ads?.images?.length > 0 ? (
        <div className="ad-images relative w-[350px] h-[250px] overflow-hidden">
          <img
            src={ads.images[adsHover]}
            alt={`Ad Image ${adsHover + 1}`}
            className={`ad-image absolute inset-0 w-full h-full object-cover cursor-pointer transition-all duration-300 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ) : (
        <p>No ads available</p>
      )}
    </div>
  );
}
