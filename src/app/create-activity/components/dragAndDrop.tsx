import React, { useState } from 'react';
import { validateImage } from './validationImage'; 
interface DragAndDropImageProps {
  onImageUpload: (file: File | null) => void;
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (file && validateImage(file)) {
      onImageUpload(file); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && validateImage(file)) {
      onImageUpload(file); 
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-4 text-center rounded-md ${
        isDragging ? 'border-blue-500 bg-blue-100' : 'border-[#D9D9D9]'
      } w-full mt-2`}
    >
      <p className="text-gray-500 mb-2">
        Arrastra y suelta una imagen aquí o usa el botón para cargarla
      </p>

      <label
        htmlFor="image-upload"
        className="cursor-pointer inline-block py-2 px-4 bg-[#235789] text-white rounded-md hover:bg-blue-800 focus:outline-none text-sm font-semibold"
      >
        Cargar Imagen
      </label>
      
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden" 
      />
    </div>
  );
};

export default DragAndDropImage;

