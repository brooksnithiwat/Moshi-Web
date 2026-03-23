import './App.css'
import icon from './assets/icon.jpg'
import RosePetals from './components/RosePetals.jsx';


function App() {

  return (
<>
<RosePetals />
<div className="landing flex flex-col lg:flex-row items-center justify-center min-h-screen bg-black gap-15">

<img src={icon} alt="icon" className='w-100 h-auto rounded-[150px]'/>
<div className="sidebar flex flex-col gap-4 p-4">
<h1 className='font-[Great_Vibes] header text-5xl font-bold text-white py-4'>Blackrose Commission</h1>
<button className='font-sans bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Term of use</button>
<button className=' italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Commission Queue</button>
<button className='font-[Great_Vibes] italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Contact</button>
<button className='font-[Great_Vibes] italic static bg-blue-500 text-white px-12 py-4 rounded-full text-xl'>Payment</button>

</div>
</div>
</>
  )
}

export default App
