'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { useFormik } from 'formik'
import { format } from "date-fns"

interface FormValues {
  name: string;
  description: string;
  image: File | null;
  date: string;
  time: string;
  place: string;
}

export default function CreateActivityForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      image: null,
      date: '',
      time: '',
      place: '',
    },
    onSubmit: (values, { resetForm }) => {
      // Simulate getting latitude and longitude from place name
      const latitude = Math.random() * 180 - 90
      const longitude = Math.random() * 360 - 180

      console.log('Submitting:', {
        ...values,
        latitude,
        longitude,
      })

      resetForm()
      setImagePreview(null)
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    formik.setFieldValue('image', file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFFFC]">
      <div className="w-full max-w-4xl p-8 bg-[#FDFFFC] rounded-xl shadow-lg border border-[#D9D9D9]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#235789]">
          Crear Nueva Actividad
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={formik.handleSubmit} className="flex-1 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#235789]"
              >
                Nombre de la Actividad
              </label>
              <input
                type="text"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#235789]"
              >
                Descripción
              </label>
              <textarea
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                required
                rows={3}
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-[#235789]"
              >
                Imagen de la Actividad
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#235789] file:text-white hover:file:bg-blue-800"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-[#235789]"
              >
                Fecha de la Actividad
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#235789]" />
                <input
                  type="date"
                  id="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  required
                  className="mt-1 block w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-[#235789]"
              >
                Hora de la Actividad
              </label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#235789]" />
                <input
                  type="time"
                  id="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  required
                  className="mt-1 block w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="place"
                className="block text-sm font-medium text-[#235789]"
              >
                Lugar de la Actividad
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#235789]" />
                <input
                  type="text"
                  id="place"
                  value={formik.values.place}
                  onChange={formik.handleChange}
                  required
                  className="mt-1 block w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
                  placeholder="Ingrese la ubicación"
                />
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="reset"
                onClick={() => {
                  formik.resetForm()
                  setImagePreview(null)
                }}
                className="w-1/3 py-2 bg-[#F9A03F] text-white rounded-md hover:bg-orange-500 focus:outline-none"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="w-1/3 py-2 bg-[#235789] text-white rounded-md hover:bg-blue-800 focus:outline-none"
              >
                Crear Actividad
              </button>
            </div>
          </form>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-[#235789]">Vista Previa</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {imagePreview && (
                <img src={imagePreview} alt="Vista previa" className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#235789] mb-2">
                  {formik.values.name || 'Nombre de la Actividad'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formik.values.description || 'Descripción de la actividad'}
                </p>
                <div className="flex items-center text-gray-500 mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.date ? format(new Date(formik.values.date), "dd/MM/yyyy") : 'Fecha'}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.time || 'Hora'}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.place || 'Lugar'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
