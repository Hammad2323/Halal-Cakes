import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [animateCart, setAnimateCart] = useState(false);

 useEffect(() => {
  if (location.state?.scrollTo) {
    const id = location.state.scrollTo;

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(scroll, 100); // retry until DOM ready
      }
    };

    scroll();
  }
}, [location]);
 const links = [
  { to: "/", text: "Home" },
  { to: "/cakes", text: "Pre-designed" },
  { to: "/customize", text: "Customized" },
  { to: "/contact", text: "Contact" },   
  { to: "/feedback", text: "Feedback" },
];
 const collections = [
  { name: "Cakes", slug: "cakes" },
  { name: "Cupcakes", slug: "cupcakes" }, 
  { name: "Doughnuts", slug: "doughnuts" },
  { name: "Delicacies", slug: "delicacies" },
];
  return (
    <header className="fixed top-0 left-0 w-full z-50">

    
      <div className="md:hidden flex justify-end items-center gap-5 px-4 py-2
      bg-gradient-to-r from-[#f7d6dc] via-[#f3b6c1] to-[#e89aa8]
      shadow-sm">

        <a href="https://www.instagram.com/cakeup44?igsh=MXE3bTdjNGI5M2xqMQ==" className="text-pink-600 text-2xl hover:scale-110 transition">
          <FaInstagram />
        </a>

       <a href="mailto:aminhalalbakery@gmail.com" className="text-rose-700 text-2xl hover:scale-110 transition">
          <FaEnvelope />
        </a>

        <Link to="/cart" className="relative">
          <ShoppingCart size={26} className="text-[#3B1A1A]" />

          {cartCount > 0 && (
            <span className={`absolute -top-2 -right-2 bg-[#3B1A1A] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300
            ${animateCart ? "scale-125" : "scale-100"}`}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      
      <nav className="bg-gradient-to-r from-[#f7d6dc]/90 via-[#f3b6c1]/80 to-[#e89aa8]/90 backdrop-blur-xl shadow-lg">

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-24">

         
          <Link to="/" className="flex items-center gap-4 md:gap-5">

           
            <div className="relative">
              <div className="absolute inset-0 bg-rose-300 blur-xl opacity-40 rounded-full animate-pulse"></div>

              <img
                src="/logo.png"
                className="relative h-14 w-14 md:h-20 md:w-20 rounded-full object-cover shadow-xl border border-white/50"
              />
            </div>

            <div className="leading-tight">
         <h1 className="text-[13px] tracking-[0.22em] text-[#2A1818] font-[Cinzel] text-center md:text-left leading-none font-light uppercase">
  AMIN HALAL BAKERY
</h1>

<p className="md:hidden mt-[2px] text-[8px] tracking-[0.35em] uppercase text-[#5A2A2A]/60 font-light text-center">
  Fresh · Sweet · Delicious
</p>

             
              <p className="hidden md:block text-sm italic text-[#5A2A2A]">
                   Fresh · Sweet · Delicious
              </p>
            </div>

          </Link>

         
          <div className="hidden md:flex items-center gap-10">

            <a 
  href="https://www.instagram.com/cakeup44?igsh=MXE3bTdjNGI5M2xqMQ==" 
  target="_blank"
  rel="noopener noreferrer"
>
              <FaInstagram />
            </a>

           <a href="mailto:aminhalalbakery@gmail.com" className="text-rose-700 text-3xl hover:scale-125 transition">
              <FaEnvelope />
            </a>

            <Link to="/cart" className="relative hover:scale-125 transition">
              <ShoppingCart size={32} className="text-[#3B1A1A]" />

              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-[#3B1A1A] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300
                ${animateCart ? "scale-125" : "scale-100"}`}>
                  {cartCount}
                </span>
              )}
            </Link>

            <Menu
              size={34}
              className="cursor-pointer text-[#3B1A1A]"
              onClick={() => setMenuOpen(true)}
            />

          </div>

          
          <div className="md:hidden">
            <Menu
              size={30}
              className="text-[#3B1A1A]"
              onClick={() => setMenuOpen(true)}
            />
          </div>

        </div>
      </nav>

      
      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >

        
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={() => setMenuOpen(false)} />

        
        <div className={`absolute right-0 top-0 h-full w-[85%] md:w-[420px]
        bg-gradient-to-b from-[#f7d6dc] via-[#f3b6c1] to-[#e89aa8]
        shadow-2xl transform transition-transform duration-700
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

          <div className="flex justify-between items-center px-6 py-5">
            <h2 className="text-xl font-serif text-[#3B1A1A]">Menu</h2>
            <X size={28} onClick={() => setMenuOpen(false)} className="text-[#3B1A1A]" />
          </div>

          <div className="p-6 grid gap-4">

            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
               className="bg-white/30 backdrop-blur-xl py-4 rounded-2xl text-center font-light tracking-wide text-[#3B1A1A] hover:bg-white/60 transition shadow-sm border border-white/30"   >
                {link.text}
              </Link>
            ))}

            <div className="mt-6">
              <p className="text-center text-xs tracking-widest text-[#5A2A2A] mb-3">
                COLLECTION
              </p>

              <div className="grid grid-cols-2 gap-3">
                {collections.map((c) => (
  <Link
    key={c.slug}
    to="/cakes"
    state={{ scrollTo: c.slug }}   // ✅ THIS IS THE FIX
    onClick={() => setMenuOpen(false)}
    className="bg-white/30 backdrop-blur-xl py-3 rounded-xl text-center font-medium text-[#3B1A1A] hover:bg-white/60 transition border border-white/30"
  >
    {c.name}
  </Link>
))}
              </div>

            </div>

          </div>
        </div>

      </div>

    </header>
  );
};

export default Navbar;