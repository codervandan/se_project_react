import { useState } from 'react'
import './App.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ModalWithForm from './ModalWithForm'
import ItemModal from './ItemModal'
import WeatherCard from './WeatherCard'
import ItemCard from './ItemCard'

import { defaultClothingItems } from '../utils/clothingItems'

function App() {

  return (
    <>
      <Main />
      <Footer />
      <defaultClothingItems />
      <Header />
      <ModalWithForm />
      <ItemModal />
      <WeatherCard />
      <ItemCard />
    </>
  )
}

export default App
