import React, { useState } from "react";
import { AppModal } from ".";

export default function AddData({ AddModal, modalTitle }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex">
      <button className="btn ml-auto" onClick={() => setIsOpen(true)}>
        {modalTitle}
      </button>
      <AppModal modalIsOpen={modalIsOpen}>
        <AddModal
          modalTitle={modalTitle}
          setIsOpen={setIsOpen}
          isEditing={false}
        />
      </AppModal>
    </div>
  );
}
