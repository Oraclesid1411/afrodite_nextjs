import { motion } from "framer-motion";

const GeneralModal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <motion.div
        className="modal-content"
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>{content.title}</h2>
        <ul>
          {content.message.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};


export default GeneralModal