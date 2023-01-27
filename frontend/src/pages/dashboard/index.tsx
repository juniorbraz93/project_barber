import { useState } from "react";

import Head from "next/head";
import { 
   Flex,
   Text,
   Heading,
   Button,
   Link as ChakraLink,
   useMediaQuery,
   useDisclosure
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from '@/services/api';

import { IoMdPerson } from 'react-icons/io'

import { Sidebar } from "@/components/sidebar";
import { ModalInfo } from "@/components/modal";
import Link from "next/link";

export interface ScheduleItem {
  id: string ;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string
  }
}
interface DashboardProps {
  schedule: ScheduleItem[]
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)")
  const {isOpen, onOpen, onClose} = useDisclosure()
  
  const [list, setList] = useState(schedule)
  const [service, setService] = useState<ScheduleItem>()

  function handleOpenModal(item: ScheduleItem) {
    setService(item)
    onOpen()
  }

  async function handleFinish(id: string) {
    try {
        
      const apiClient = setupAPIClient()

      await apiClient.delete('/schedule', {
        params:{
          schedule_id: id
        }
      })   
      
      const filtrItem = list.filter(item => {
        return (item?.id !== id)
      })
      setList(filtrItem)
      onClose()
      alert('Serviço finalizar com sucesso!')
      
    } catch (error) {
      console.log(error);
      onClose()
      alert('Error ao finalizar serviço!')
    }
  }

  return (
  <>
    <Head>
      <title>BarbePro - Minha barbearia</title>
    </Head>
    <Sidebar>
      <Flex direction='column' align='flex-start' justify='flex-start' >
        <Flex
          w='100%'
          direction='row'
          align='center'
          justify='flex-start'
        >
          <Heading fontSize='3xl' mt={4} mb={4} mr={4} color='#FFF' >
            Agenda
          </Heading>

          <Link
            href='/new'
          >
            <Button bg='#2D3748' color='#FFF' >Registrar</Button>
          </Link>

        </Flex>

        {
          list.map(item => (
                    
              <ChakraLink
                onClick={ () => handleOpenModal(item) }
                key={item?.id}
                w='100%'
                m={0}
                p={0}
                mt={1}
                bg='transparent'
                style={{ textDecoration: 'none' }}
              >

                <Flex
                  w='100%'
                  direction={isMobile ? 'column' : 'row'}
                  p={4}
                  rounded={4}
                  mb={2}
                  bg='barber.400'
                  justify='space-between'
                  align={isMobile ? 'flex-start' : 'center'}
                >
                  <Flex
                    direction='row'
                    mb={isMobile ? 2 : 0}
                    align='center'
                    justify='center'
                  >
                    <IoMdPerson size={28} color='#FFB13E' />
                    <Text
                      color='#F1F1F1'
                      fontWeight='bold'
                      ml={4}
                      noOfLines={1}
                    >
                        {item?.customer}
                    </Text>
                  </Flex>

                  <Text
                    fontWeight='bold'
                    color='#F1F1F1'
                    mb={isMobile ? 2 : 0}
                  >
                    {item?.haircut?.name}
                  </Text>
                  <Text
                    fontWeight='bold'
                    color='#F1F1F1'
                    mb={isMobile ? 2 : 0}
                  >
                    R$ {Number(item?.haircut?.price).toFixed(2)}
                  </Text>

                </Flex>
              </ChakraLink>

          ))
        }

      </Flex>
    </Sidebar>

    <ModalInfo
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      data={service}
      finishService={ () => handleFinish(service?.id) }
    />

  </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/schedule')    
     
    return {
      props: {
        schedule: response.data,
      }
    }
    
  } catch (error) {
    return {
      props: {
        schedule: []
      }
    }    
  }
})