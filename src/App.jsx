import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import MyWork from './components/MyWork/MyWork'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Skill from './components/Skill/Skill'


function App() {

  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Skill />
      <MyWork />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
