import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App