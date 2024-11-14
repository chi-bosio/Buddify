'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { format } from "date-fns"

export default function CreateActivityForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /* PLACEHOLDER */
    const latitude = Math.random() * 180 - 90
    const longitude = Math.random() * 360 - 180

    console.log('Submitting:', { 
      name, 
      description, 
      image, 
      date, 
      time, 
      place, 
      latitude, 
      longitude 
    })
    
    // Reset form after submission
    setName('')
    setDescription('')
    setImage(null)
    setDate(undefined)
    setTime('')
    setPlace('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFFFC]">
      <div className="w-full max-w-4xl p-8 bg-[#FDFFFC] rounded-xl shadow-lg border border-[#D9D9D9]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#235789]">
          Crear Nueva Actividad
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#235789] file:text-white hover:file:bg-blue-800"
              />
            </div>
          </div>

          <div className="space-y-4">
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
                  value={date ? format(date, "yyyy-MM-dd") : ''}
                  onChange={(e) => setDate(e.target.valueAsDate || undefined)}
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
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
                  placeholder="Ingrese la ubicación"
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => {
                setName('')
                setDescription('')
                setImage(null)
                setDate(undefined)
                setTime('')
                setPlace('')
              }}
              className="w-1/4 py-2 bg-[#F9A03F] text-white rounded-md hover:bg-orange-500 focus:outline-none"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="w-1/4 py-2 bg-[#235789] text-white rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Crear Actividad
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}