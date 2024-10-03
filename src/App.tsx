import React, { useState } from 'react'
import Header from './components/Header'
import DrinkList from './components/DrinkList'
import Cart from './components/Cart'
import Footer from './components/Footer'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const updateCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: item.quantity } : i
        ).filter(i => i.quantity > 0)
      } else if (item.quantity > 0) {
        return [...prevItems, item]
      }
      return prevItems
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Bebidas a Domicilio en Barranca</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DrinkList updateCart={updateCart} />
          </div>
          <div className="lg:sticky lg:top-4 lg:self-start">
            <Cart items={cartItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App