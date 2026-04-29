import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const HomePage = () => {
  return (
    <div className="bg-[#FFF0F3] text-[#4B2E2E] font-[PlayfairDisplay] overflow-hidden relative">

      
      <div className="cursor-glow"></div>

      
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-300 blur-3xl opacity-20 animate-float-delayed"></div>

     
      <section className="grid md:grid-cols-2 min-h-screen items-center relative z-10">

       
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="px-8 md:px-20 py-16"
        >
          <p className="uppercase tracking-[0.5em] text-sm text-[#D17B88] mb-6">
            Amin’s Halal Bakery
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Sweetness <br />
            Meets <span className="text-[#FF7F6A]">Luxury</span>
          </h1>

          <p className="text-[#7A4E4E] text-lg leading-relaxed mb-8 max-w-md font-[Poppins]">
            Designed to impress. Crafted to perfection. Every creation tells a story of elegance and indulgence.
          </p>

        <Link
  to="/customize"
  className="relative inline-block px-10 py-3 rounded-full bg-[#FF7F6A] text-white font-medium tracking-wide overflow-hidden group"
>
  <span className="relative z-10">Customize Your Cake</span>

  
  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></div>

  
  <div className="absolute -left-20 top-0 h-full w-20 bg-white/30 rotate-12 transform group-hover:translate-x-[300%] transition duration-700"></div>
</Link>
        </motion.div>

        
        <div className="h-[400px] md:h-full flex items-center justify-center perspective">

  <div className="relative group w-[90%] md:w-[80%] transition-transform duration-500 transform-style preserve-3d hover:rotate-y-6 hover:rotate-x-3">
    
    <img
      src="/pic2.jpg"
      alt="Luxury Cake"
      className="w-full h-full object-cover rounded-3xl shadow-2xl"
    />

    
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>

  </div>
</div>
      </section>

     
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center py-20 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Our Collection
        </h2>
        <p className="mt-4 text-[#D17B88] tracking-widest text-sm font-[Poppins]">
          Cakes • Pastries • Doughnuts • Delicacies
        </p>
      </motion.section>

      
      <section className="grid md:grid-cols-4 gap-6 px-6 md:px-16">

        {[
          { name: "Cakes", img: "/pic1.jpg" },
          { name: "Pastries", img: "/pastry.jpg" },
          { name: "Doughnuts", img: "/donut.jpg" },
          { name: "Delicacies", img: "/brownie.jpg" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link
             to="/cakes"
state={{ scrollTo: item.name.toLowerCase() }}
              className="group relative rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={item.img}
                className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#FF7F6A]/20 transition"></div>

              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-semibold">
                  {item.name}
                </h3>
                <div className="w-0 group-hover:w-20 h-[2px] bg-[#FF7F6A] mt-2 transition-all duration-500"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

     
    <div className="w-20 h-[2px] bg-[#FF7F6A] mx-auto mb-6"></div>
     <motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="py-28 px-6 md:px-20 text-center max-w-5xl mx-auto"
>
  <h2 className="text-3xl md:text-5xl font-bold mb-8">
    The Essence of Amin’s
  </h2>

  <p className="text-[#7A4E4E] text-lg leading-relaxed mb-6 font-[Poppins]">
    At Amin’s Halal Bakery, we believe that every dessert should be more than
    just a treat — it should be an experience of elegance, emotion, and
    unforgettable taste. Rooted in tradition and elevated by modern artistry,
    our creations are designed to capture the beauty of every moment.
  </p>

  <p className="text-[#7A4E4E] text-lg leading-relaxed mb-6 font-[Poppins]">
    From the careful selection of premium halal ingredients to the delicate
    craftsmanship behind every detail, we pour passion into everything we bake.
    Each cake, pastry, and delicacy is thoughtfully created to reflect
    sophistication, purity, and a commitment to excellence that never
    compromises.
  </p>

  <p className="text-[#7A4E4E] text-lg leading-relaxed mb-6 font-[Poppins]">
    Whether you are celebrating life’s grandest occasions or indulging in a
    quiet moment of sweetness, Amin’s transforms simple cravings into luxurious
    experiences — where flavor, beauty, and emotion come together in perfect
    harmony.
  </p>

  <p className="italic text-[#FF7F6A] text-xl mt-6">
    “Luxury is not just seen — it is felt in every bite.”
  </p>
</motion.section>
    </div>
  );
};

export default HomePage;