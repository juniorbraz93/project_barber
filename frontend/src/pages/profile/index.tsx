import { useContext, useState } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button
} from '@chakra-ui/react'

import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { AuthContext } from "@/context/AuthContext";

import { setupAPIClient } from "@/services/api"; 
import { api } from "@/services/apiClient";

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps ) {

  const { logoutUser } = useContext(AuthContext)

  const [name, setName] = useState(user && user?.name)
  const [address, setAddress] = useState(user?.address ? user?.address : '')

  async function handleLogout() {
    await logoutUser()
  }

  async function handleUpdateUser() {
    if (name === '') {
      return
    }
    try {
      const apiClient = setupAPIClient()
      await apiClient.put('/update', {
        name: name,
        address: address,
      })

      alert('Dados alterados com sucesso! 😊')
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <Head>
        <title> Minha conta - BarbePRO </title>
      </Head>
      <Sidebar>
        <Flex direction='column' alignItems='flex-start' justifyContent='flex-start' >
          <Flex w='100%' direction='row'  alignItems='center' justifyContent='flex-start' >
            <Heading fontSize='3xl' mt={4} mb={4} mr={4} color='orange.900' >Minha conta</Heading>
          </Flex>

          <Flex pt={8} pb={8} maxW='700px' w='100%' direction='column' bg='barber.400' alignItems='center' justifyContent='center' >
            <Flex direction='column' w='85%' >

              <Text mb={2} fontSize='xl' fontWeight='bold' color='white'>Nome da barbearia: </Text>
              <Input
                color='white'
                mb={3}
                w='100%'
                bg='gray.900'
                placeholder="Nome da sua Barbearia"
                size='lg'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Text mb={2} fontSize='xl' fontWeight='bold' color='white'>Endereço: </Text>
              <Input
                color='white' 
                mb={3}
                w='100%'
                bg='gray.900'
                placeholder="Endereço da barbearia"
                size='lg'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Text mb={2} fontSize='xl' fontWeight='bold' color='white'>Plano atual: </Text>
              <Flex
                direction='row'
                w='100%'
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                bg='barber.900'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text p={2} fontSize='lg' color={premium ? '#FBA931' : '#4DFFB4'} fontWeight='bold' >
                  Plano { premium ? 'Premium' : 'Grátis' }
                  </Text>

                <Link href='plans'>
                  <Box
                  cursor='pointer'
                  p={1}
                  pl={2}
                  pr={2}
                  color='white'
                  bg='#00CD52'
                  rounded={4}
                  fontWeight='bold' 
                  >
                    Mudar de plano
                  </Box>
                </Link>

              </Flex>

              <Button
                color='white'
                w='100%'
                mt={3}
                mb={4}
                bg='button.cta'
                size='lg'
                _hover={{
                  bg: '#FFB13E'
                }}
                onClick={handleUpdateUser}
              >
                Salvar
              </Button>
              <Button
              color='red.500'
              w='100%'
              mb={6}
              bg='transparent'
              borderWidth={2}
              borderColor='red.500'
              size='lg'
              _hover={{
                bg: 'transparent'
              }}
              onClick={handleLogout}
              >
                Sair da conta
              </Button>

            </Flex>
          </Flex>

        </Flex>
      </Sidebar>
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiClinet = setupAPIClient(ctx)

    const response = await apiClinet.get('/current')

    const user = {
      id: response.data.data.id,
      name: response.data.data.name,
      email: response.data.data.email,
      address: response.data.data?.address
    }     

    
  return {
    props: {
      user: user ,
      premium: response.data.data?.subscriptions?.status === 'active' ? true : false
    }
  }
    
    
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
    
  }

})