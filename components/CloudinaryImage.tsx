import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { cld } from '../lib/cloudinary';

interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  width = 500,
  height = 500,
  className = '',
  alt = 'Image'
}) => {
  const img = cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return <AdvancedImage cldImg={img} className={className} alt={alt} />;
};

export default CloudinaryImage;
