import Head from "next/head";

import {
  Flex,
  Button,
  Heading,
  Text,
  useMediaQuery
 } from "@chakra-ui/react";

 import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

interface PlansProps {
  premium: boolean;
}

export default function Plans({ premium }: PlansProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      <Head>
        <title>BarbePro - Planos</title>
      </Head>
      <Sidebar>
        <Flex w='100%' direction='column' align='flex-start' justify='flex-start' >
          <Heading color='#FFF' fontSize='3xl' mt={4} mb={4} mr={4} >
            Planos
          </Heading>
        </Flex>

        <Flex
          pb={8}
          maxW='780px'
          w='100%'
          direction='column'
          align='flex-start'
          justify='flex-start'
        >
          <Flex
            gap={4}
            w='100%'
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg='barber.400'
              flexDirection='column'
            >
              <Heading
                textAlign='center'
                fontSize='2xl'
                mt={2}
                mb={4}
                color='gray.100'
              >
                Plano Grátis
              </Heading>
              <Text fontWeight='medium' ml={4} mb={2}> Registra cortes </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Criar apenas 3 modelos de cortes </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Editar dados perfil </Text>

            </Flex>
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg='barber.400'
              flexDirection='column'
            >
              <Heading
                textAlign='center'
                fontSize='2xl'
                mt={2}
                mb={4}
                color='#31FB6A'
              >
                Premium
              </Heading>
              <Text fontWeight='medium' ml={4} mb={2}> Registra cortes ilimitados </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Criar modelos ilimitados </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Editar dados perfil </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Editar tipos cortes </Text>
              <Text fontWeight='medium' ml={4} mb={2}> Recebe todas atualizações </Text>

              <Text
                color='#31FB6A'
                fontWeight='bold'
                fontSize='2xl'
                ml={4}
                mb={2}
              > 
              R$ 9.99
              </Text>

              <Button
                bg={premium ? 'barber.900' : 'button.cta'}
                color='#FFF'
                fontWeight='bold'
                m={2}
                _hover={{ bg:'gray.400'}}
                onClick={ () => { alert('Teste') } }
                isDisabled={premium}
              >
                {premium ? (
                  "VOCÊ JÁ É PREMIUM"
                ) : (
                  "VIRAR PREMIUM"
                )}
              </Button>

              {
                premium && (
                  <Button
                    bg='#FFF'
                    color='barber.900'
                    fontWeight='bold'
                    m={2}
                    _hover={{ bg:'gray.400'}}
                    onClick={ () => {} }
                  >
                    ALTERAR ASSINATURA
                  </Button>
                )
              }


            </Flex>
          </Flex>

        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/current')

    return {
      props: {
        premium: response.data?.subscriptions?.status === 'active' ? false : true
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