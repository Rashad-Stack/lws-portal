import React from "react";
import Modal from "react-modal";

export default function AppModal({ modalIsOpen, children }) {
  return (
    <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
      {children}
    </Modal>
  );
}

// styling for modal
const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(000, 000, 000, 0.75)",
  },
};
