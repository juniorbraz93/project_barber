import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

import { FiUser, FiScissors } from 'react-icons/fi'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { ScheduleItem } from '@/pages/dashboard'

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({ isOpen, onOpen, onClose, data, finishService }: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg='barber.400'
      >
        <ModalHeader color='#FFF' >Próximo</ModalHeader>
        <ModalCloseButton color='#FFF' />

        <ModalBody>
          <Flex align='center' mb={3}>
            <Text color='#FFF' >TESTE MODAL</Text>
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}