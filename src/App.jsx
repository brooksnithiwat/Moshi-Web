import './App.css'
import icon from './assets/icon.jpg'
import RosePetals from './components/RosePetals.jsx';
import MeteorCurtain from './components/MeteorCurtain.jsx';

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
 <RosePetals />
<div className="landing flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-yellow-200 gap-15">

<img src={icon} alt="icon" className='w-90 h-auto rounded-[150px] shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:shadow-[0_0_40px_rgba(255,255,0,0.9)] transition-shadow duration-500'/>
<div className="sidebar flex flex-col gap-4 p-4">
<h1 className="font-[Great_Vibes] text-6xl font-bold text-white py-4 animate-glow">
  Blackrose Commission
</h1>
<button className='font-sans bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Term of use</button>
<button className=' italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Commission Queue</button>
<button className='font-[Great_Vibes] italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Contact</button>
<button className='font-[Great_Vibes] italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Payment</button>

</div>
</div>
  </MeteorCurtain>
</div>
</>
  )
}

export default App


