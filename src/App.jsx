import './App.css'
import icon from './assets/icon.jpg'
import FireFlyEffect from './components/FireflyEffect.jsx';
import MeteorCurtain from './components/MeteorCurtain.jsx';
import NavButton from './components/Navbutton.jsx';
function App() {

  return (
<>
<div style={{ width: "100vw", height: "auto"}}>
  <MeteorCurtain
    title="Blackrose Commission"
    subtitle="By Moshi"
    speed={3}
    density={5}
    onDone={() => console.log("ready!")}
  >
 <FireFlyEffect />
<div className="landing flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-yellow-200 gap-15">

<img src={icon} alt="icon" className='w-90 h-auto rounded-[150px] shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-glow-yellow'/>
<div className="sidebar flex flex-col gap-4 p-4">
<h1 className="font-[Great_Vibes] text-6xl font-bold text-white py-4 animate-glow text-center">
  Blackrose Commission
</h1>
<div className='flex flex-col gap-4 p-4 justify-center items-center'>
<NavButton to="/terms">Term of use</NavButton>
<NavButton to="/queue">Commission Queue</NavButton>
<NavButton to="/contact">Contact</NavButton>
<NavButton to="/payment">Payment</NavButton>
</div>
</div>
</div>
  </MeteorCurtain>
</div>
</>
  )
}

export default App


