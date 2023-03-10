import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { Sidebar } from '../../components/sidebar'
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery
} from '@chakra-ui/react'

import Link from 'next/link';

import { IoMdPricetag } from 'react-icons/io'
import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/services/api';

interface HaircutItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}
interface HaircutsProps {
  haircuts: HaircutItem[];
}


export default function Haircuts({ haircuts }: HaircutsProps){

  const [isMobile] = useMediaQuery("(max-width: 500px)")

  const [haircutsList, setHaircutsList] = useState<HaircutItem[]>(haircuts || [])
  const [disableHaircut, setDisableHaircut] = useState("enabled")

  async function handleDisable(e: ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient()

    if (e.target.value === 'disabled') {

      setDisableHaircut('enabled')

      const response = await apiClient.get('/haircuts', {
        params: {
          status: true,
        }
      })

      setHaircutsList(response.data)
    
      
    } else {

      setDisableHaircut('disabled')
      const response = await apiClient.get('/haircuts', {
        params: {
          status: false,
        }
      })

      setHaircutsList(response.data)

    }
  }

  return(
    <>
      <Head>
        <title>BarbePro - Modelos de corte</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
         
         <Flex
          direction={isMobile ? 'column' : 'row'}
          w="100%"
          alignItems={isMobile ? 'flex-start' : 'center'}
          justifyContent="flex-start"
          mb={0}
         >
          <Heading
            fontSize={isMobile ? '28px' : "3xl"} 
            mt={4} 
            mb={4}
            mr={4}
            color="orange.900"
          >
            Modelos de corte
          </Heading>

          <Link href="/haircut">
            <Button bg='#2D3748' _hover={{ bg: 'gray.900'}} >
              Cadastrar novo
            </Button>
          </Link>

          <Stack ml="auto" align="center" direction="row">
            <Text fontWeight="bold" color='white' >ATIVOS</Text>
            <Switch
              colorScheme="green"
              size="lg"
              value={disableHaircut}
              onChange={ (e: ChangeEvent<HTMLInputElement>) => handleDisable(e) }
              isChecked={disableHaircut === 'disabled' ? false : true}
            />
          </Stack>
         </Flex>
        </Flex>
        
        {
          haircutsList.map(haircut => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`} >
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg="barber.400"
                direction={isMobile ? 'column' : 'row'}
                align={isMobile ? 'flex-start' : 'center'}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >

                <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center" >
                  <IoMdPricetag size={28} color="#fba931"/>
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Pre??o: R$ {Number(haircut.price).toFixed(2)}
                </Text>

              </Flex>
            </Link>
          ))
        }


      </Sidebar>
    </>
  )
}



export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/haircuts', {
      params: {
        status: true,
      }
    })
    
    if (response.data == null) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }    
    }
    
    return {
      props: {
        haircuts: response.data
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }    
  }
})