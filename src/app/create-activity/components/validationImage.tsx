import Swal from 'sweetalert2';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 

export const validateImage = (file: File | null): boolean => {
  if (!file) return false;

  if (!file.type.startsWith('image/')) {
    Swal.fire({
      icon: 'error',
      title: 'Tipo de archivo no permitido',
      text: 'Solo se permiten imágenes.',
    });
    return false;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    Swal.fire({
      icon: 'error',
      title: 'Imagen demasiado grande',
      text: 'El tamaño máximo permitido es 2 MB.',
    });
    return false;
  }

  return true;
};
