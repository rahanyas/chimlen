import {motion} from 'framer-motion'

const footerItems = [
  { media: "LinkedIn", link: "https://www.linkedin.com/in/rahanyas" },
  { media: "Instagram", link: "https://www.instagram.com/rahanyas" },
  { media: "GitHub", link: "https://www.github.com/rahanyas" },
];

const Footer = () => {
  return (
    <motion.footer className="w-full  md:flex md:justify-between md:px-9 p-4 md:items-center text-center bg-black">
      <h1 className="text-[20px] capitalize text-white">© 2025 Chimlen</h1>
      <div className="md:flex md:gap-5 ">
        {footerItems.map((item, index) => (
          <a key={index} href={item.link} className="text-gray-600 hover:text-gray-900 capitalize text-[20px] ml-2 md:ml-0">
            {item.media}
          </a>
        ))}
      </div>
    </motion.footer>
  );
};


export default Footer