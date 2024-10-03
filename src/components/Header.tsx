import React from 'react'
import { Beer } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Beer className="mr-2" size={32} />
          <span className="text-xl font-bold">Licorería Barranca</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200 transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">Catálogo</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header