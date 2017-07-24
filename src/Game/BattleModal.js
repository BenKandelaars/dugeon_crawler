import React from "react";
import ModalWrapper from "../Util/ModalWrapper.js";

function ModalContent(props) {
  return (
    <div>
      <h1>Battle!</h1>
      <button
        className="btn_main"
        onClick={ () => props.toggleModal()}
      >
      Close
      </button>
    </div>
  )
}

export default function BattleModal(props) {
  return (
    <ModalWrapper isOpen={props.isOpen}>
      <ModalContent toggleModal={props.toggleModal} />
    </ ModalWrapper>
  )
}
