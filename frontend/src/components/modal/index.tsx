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
            <FiUser size={28} color='#FFB13E' />
            <Text color='#FFF' ml={3} fontSize='2xl' fontWeight='bold' >
              {data?.customer}
            </Text>
          </Flex>

          <Flex align='center' mb={3}>
            <FiScissors size={28} color='#FFF' />
            <Text color='#FFF' ml={3} fontSize='large' fontWeight='bold' >
              {data?.haircut?.name}
            </Text>
          </Flex>

          <Flex align='center' mb={3}>
            <FaMoneyBillAlt size={28} color='#46EF75' />
            <Text color='#FFF' ml={3} fontSize='large' fontWeight='bold' >
              R$ {Number(data?.haircut?.price).toFixed(2)}
            </Text>
          </Flex>

          <ModalFooter>
            <Button
              color='#FFF'
              bg='button.cta'
              mr={3}
              _hover={{ bg:'#FFB13E'}}
              onClick={() => finishService()}
            >
              Finalizar serviço
            </Button>        
          </ModalFooter>

        </ModalBody>

      </ModalContent>
    </Modal>
  )
}