import React, { useState } from "react";
import { AppModal } from "../ui";
import AddVideoModal from "./AddVideoModal";

export default function AddVideo() {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex">
      <button className="btn ml-auto" onClick={() => setIsOpen(true)}>
        Add Video
      </button>
      <AppModal modalIsOpen={modalIsOpen}>
        <AddVideoModal
          modalTitle="Add video"
          setIsOpen={setIsOpen}
          isEditing={false}
        />
      </AppModal>
    </div>
  );
}
