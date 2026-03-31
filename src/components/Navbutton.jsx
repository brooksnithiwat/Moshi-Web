import { Link } from "react-router-dom"; 

export default function NavButton({ to, children }) {
  return (
    <Link
      to={to}
className="
font-semibold 
font-sans text-center

bg-gradient-to-r from-purple-200 to-purple-500
hover:bg-gradient-to-r hover:from-yellow-200 hover:to-yellow-500

border-2 border-white
text-white
w-full lg:w-90
px-20 py-4 rounded-full

shadow-[0_0_10px_rgba(255,255,255,0.8)]

transition-all duration-700
text-ml lg:text-xl
"
    >
      {children}
    </Link>
  );
}

