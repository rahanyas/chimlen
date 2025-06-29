import { motion } from 'framer-motion';

const Demo = () => {
  return (
    <div 
    className='flex justify-center items-center w-full h-screen'
>
      <motion.div
        animate={{ y: [0, -15,  0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          padding: '30px 50px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e0e0e0',
          fontSize: '1.2rem',
          fontWeight: '500'
        }}
      >
        lets chat with chimlen ... 
      </motion.div>
    </div>
  );
};

export default Demo;
