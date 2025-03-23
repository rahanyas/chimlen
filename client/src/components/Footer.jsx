/* eslint-disable no-unused-vars */
import {motion} from 'framer-motion'

const footerItems = [
  { media: "LinkedIn", link: "https://www.linkedin.com/in/Rahanyas." },
  { media: "Instagram", link: "https://www.instagram.com/rahan.ys.__" },
  { media: "GitHub", link: "https://www.github.com/rahanyas." },
];

const Footer = () => {
  return (
    <motion.footer className="w-full  md:flex md:justify-between md:px-9 p-4 md:items-center text-center bg-black">
      <h1 className="text-[20px] capitalize text-white">© 2025 Chimlen</h1>
      <div className="md:flex md:gap-5 ">
        {footerItems.map((item, index) => (
          <a key={index} href={item.link} className="text-white hover:text-green-400 capitalize text-[20px] ml-2 md:ml-0 transition-all duration-300 relative">
  {item.media}
  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full"></span>
</a>

        ))}
      </div>
    </motion.footer>
  );
};


export default Footer