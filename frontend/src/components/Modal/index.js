import { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap'

function ModalComponent({ title, children, ...props }) {
  const toggle = () => {
    props.setIsOpenModal(false)
    props.setIsOpenEdit(false)
  }

  return (
    <>
      <Container className="mb-3 mt-3">
        <Button
          color="primary"
          size="sm"
          onClick={() => props.setIsOpenModal(true)}
        >
          Tambah Paket
        </Button>
      </Container>
      <Modal
        isOpen={props?.isOpenModal || props?.isOpenEdit}
        toggle={toggle}
        keyboard={false}
        backdrop="static"
        {...props}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  )
}

export default ModalComponent
