import React, { useState } from 'react'
import { ShoppingCart, MessageCircle } from 'lucide-react'
import { CartItem } from '../App'
import Map from './Map'

interface CartProps {
  items: CartItem[]
}

interface CustomerInfo {
  name: string
  address: string
  phone: string
  lat: number | null
  lng: number | null
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
    lat: null,
    lng: null,
  })
  const [showForm, setShowForm] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    setCustomerInfo(prev => ({ ...prev, lat, lng }))
  }

  const createWhatsAppMessage = () => {
    const itemsList = items.map(item => `${item.name} x${item.quantity}`).join('\n')
    const message = `Hola, me gustaría hacer un pedido:\n\n${itemsList}\n\nTotal: S/ ${total.toFixed(2)}\n\nNombre: ${customerInfo.name}\nDirección: ${customerInfo.address}\nTeléfono: ${customerInfo.phone}\nUbicación: https://www.google.com/maps?q=${customerInfo.lat},${customerInfo.lng}`
    return encodeURIComponent(message)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ShoppingCart className="mr-2" />
        Carrito
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm sm:text-base">
                <span>{item.name} x{item.quantity}</span>
                <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Proceder al pedido
            </button>
          ) : (
            <form className="mt-4 space-y-4">
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                placeholder="Nombres y Apellidos"
                className="w-full p-2 border rounded text-sm"
                required
              />
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                placeholder="Dirección"
                className="w-full p-2 border rounded text-sm"
                required
              />
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                placeholder="Número de celular"
                className="w-full p-2 border rounded text-sm"
                required
              />
              <div className="mt-4">
                <p className="mb-2 font-semibold text-sm">Selecciona tu ubicación en el mapa:</p>
                <Map onLocationSelect={handleLocationSelect} />
              </div>
              <a
                href={`https://wa.me/51928717437?text=${createWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <MessageCircle className="mr-2" />
                Pedir por WhatsApp
              </a>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default Cart