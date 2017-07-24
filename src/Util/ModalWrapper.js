import React from "react";
import Modal from 'react-modal';

class ModalWrapper extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      width: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth
      })
    });
  }

  render() {
    let customStyling={
      overlay: {
        backgroundColor: "rgba(255,255,255,0.2)"
      },
      content: {
        minWidth:  "300px",
        maxWidth: "600px",
      }
    }

    if (this.state.width > 680){
      customStyling.content.left = ( this.state.width - 600 ) / 2
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Modal"
        style={customStyling}
        >
          {this.props.children}
      </Modal>
    )
  }
}

export default ModalWrapper

/*  To use this modal.
*   Create a functional Component with content.
*   The return another functional controled component
*     using the ModalWrapper & ModalContent.
*
*   Parent of Modal will need to control opening in
*   state provide a function to close.

function ModalContent(props) {

  console.log(props)
  return (
    <div>
      <button
        className="btn_main"
        onClick={ () => props.toggleModal()}
        >
        Close
      </button>
    </div>
  )
}


export default function ModalPage(props) {
  return (
    <ModalWrapper isOpen={props.isOpen}>
      <ModalContent toggleModal={props.toggleModal} />
    </ ModalWrapper>
  )
}
*/
