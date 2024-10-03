import React, { useState } from 'react'
import { Beer, Wine, GlassWater, Coffee } from 'lucide-react'
import { CartItem } from '../App'

interface DrinkListProps {
  updateCart: (item: CartItem) => void
}

const initialDrinks = [
  { id: 1, name: 'Cerveza Cusqueña Dorada', description: 'Pack x 6 - 330ml', price: 23.90, icon: Beer, quantity: 0, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Pisco Cuatro Gallos Quebranta', description: '700ml', price: 39.90, icon: Wine, quantity: 0, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Ron Cartavio Black', description: '750ml', price: 25.90, icon: GlassWater, quantity: 0, image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Whisky Johnnie Walker Red Label', description: '750ml', price: 54.90, icon: Wine, quantity: 0, image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Vodka Absolut', description: '750ml', price: 54.90, icon: GlassWater, quantity: 0, image: 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Vino Tinto Casillero del Diablo', description: 'Cabernet Sauvignon 750ml', price: 29.90, icon: Wine, quantity: 0, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Gin Tanqueray', description: '750ml', price: 79.90, icon: GlassWater, quantity: 0, image: 'https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Cerveza Corona', description: 'Pack x 6 - 355ml', price: 26.90, icon: Beer, quantity: 0, image: 'https://images.unsplash.com/photo-1600213903598-25be92abde0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 9, name: 'Pisco Portón Mosto Verde', description: '750ml', price: 89.90, icon: Wine, quantity: 0, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 10, name: 'Baileys Original', description: '750ml', price: 59.90, icon: Coffee, quantity: 0, image: 'https://images.unsplash.com/photo-1624367171718-14026220ee35?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
]

const DrinkList: React.FC<DrinkListProps> = ({ updateCart }) => {
  const [drinks, setDrinks] = useState(initialDrinks)

  const updateQuantity = (id: number, change: number) => {
    setDrinks(drinks.map(drink => {
      if (drink.id === id) {
        const newQuantity = Math.max(0, drink.quantity + change)
        updateCart({ id: drink.id, name: drink.name, price: drink.price, quantity: newQuantity })
        return { ...drink, quantity: newQuantity }
      }
      return drink
    }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drinks.map((drink) => (
        <div key={drink.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
          <img src={drink.image} alt={drink.name} className="w-full h-48 object-cover mb-4 rounded" />
          <div className="flex items-center mb-2">
            <drink.icon className="mr-4 text-blue-600 flex-shrink-0" size={24} />
            <div className="flex-grow">
              <h3 className="font-semibold text-sm sm:text-base">{drink.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{drink.description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-base sm:text-lg font-bold text-blue-700">S/ {drink.price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(drink.id, -1)}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                disabled={drink.quantity === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-8 text-center">{drink.quantity}</span>
              <button 
                onClick={() => updateQuantity(drink.id, 1)}
                className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DrinkList