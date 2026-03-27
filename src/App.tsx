import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className='flex items-center justify-center flex-col gap-3 h-screen'>
      <div className='bg-primary w-20 h-20 flex items-center rounded-md'>
        <span className='tracking-tighter text-accent'>Tailwind test</span>
      </div>
      <Button className='cursor-pointer' onClick={() => setCount(prev => prev + 1)}>
        Count {count}
      </Button>
    </section>
  )
}

export default App
