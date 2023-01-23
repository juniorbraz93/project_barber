import Head from "next/head";
import Link from "next/link";

import { Sidebar } from "@/components/sidebar";

import { 
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input
} from "@chakra-ui/react";

import { FiChevronLeft } from 'react-icons/fi'

export default function NewHaircut(){
  const [isMobile] = useMediaQuery('(max-width: 500px)')
  return (
    <>
      <Head>
        <title>BarbePro - Cadastrar novo corte </title>
      </Head>

      <Sidebar>
        <Flex direction='column' alignItems='flex-start' justifyContent='flex-start' >
          <Flex 
            direction={ isMobile ? 'column' : 'row' }
            w='100%'
            align={ isMobile ? 'flex-start' : 'center' }
            mb={isMobile ? 4 : 0}
          >

            <Link href='/haircuts'>
              <Button 
                color='white' 
                bg='#2D3748' 
                p={4} 
                display='flex' 
                alignItems='center' 
                justifyContent='center'
                mr={4} 
              >
                <FiChevronLeft size={24} color='white' />
                Voltar
              </Button>
            </Link>

            <Heading
              color='orange.900'
              mt={4}
              mb={4}
              mr={4}
              fontSize={ isMobile ? '28px' : '3xl' }
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            maxW='700px'
            bg='barber.400'
            w='100%'
            align='center'
            justify='center'
            pt={8}
            pb={8}
            direction='column'
          >
            <Heading
              color='white'
              fontSize={ isMobile ? '22px' : '3xl' }
              mb={4}
            >
              Cadastrar modelo
            </Heading>

            <Input 
              placeholder="Nome do corte"
              size='lg'
              type='text'
              w='85%'
              borderColor='#424242'
              bg='gray.900'
              color='white'
              mb={3}
            />

            <Input 
              placeholder="Valor do corte. ex: R$ 59.90"
              size='lg'
              type='text'
              w='85%'
              borderColor='#424242'
              bg='gray.900'
              color='white'
              mb={4}
            />

            <Button
              w='85%'
              size='lg'
              color='gray.900'
              bg='button.cta'
              mb={6}
              _hover={{ bg:'#FFB13E'}}
            >
              Cadastrar
            </Button>

          </Flex>

        </Flex>
      </Sidebar>
    </>    
  )
}