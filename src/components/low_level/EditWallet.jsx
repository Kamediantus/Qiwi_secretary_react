import React from "react";
import ReactDOM from "react-dom";
import ReactModal from 'react-modal';
import '../../styles/NewWallet.css'

class ExampleApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    initWidth={10}
                    initHeight={10}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}

export default ExampleApp;
