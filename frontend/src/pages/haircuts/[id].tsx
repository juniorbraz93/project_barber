import Head from "next/head";
import Link from "next/link";

import { 
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch
 } from "@chakra-ui/react";

 import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";

export default function EditHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)")
  return (
    <>
      <Head>
        <title>BarbePro - Editar corte</title>
      </Head>
      <Sidebar>
        <Flex direction='column' alignItems='flex-start' justifyContent='flex-start' >
          <Flex
            direction={isMobile ? 'column' : 'row'}
            w="100%"
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="flex-start"
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
                mr={3} 
              >
                <FiChevronLeft size={24} color='white' />
                Voltar
              </Button>
            </Link>
            <Heading 
              color='white' 
              fontSize={ isMobile ? '22px' : '3xl' } 
            >
              Editar corte
            </Heading>
          </Flex>

          <Flex
            mt={4}
            maxW='700px'
            pt={8}
            pb={8}
            w='100%'
            bg='barber.400'
            direction='column'
            align='center'
            justify='center'
          >
            <Heading 
              color='white' 
              fontSize={ isMobile ? '22px' : '3xl' }
              mb={4}
            >
              Editar corte
            </Heading>

            <Flex
              w='85%'
              direction='column'
            >
              <Input 
                placeholder="Nome do corte"
                size='lg'
                type='text'
                w='100%'
                borderColor='#424242'
                bg='gray.900'
                color='white'
                mb={3}
              />

              <Input 
                placeholder="Valor do corte. ex: R$ 59.90"
                size='lg'
                type='text'
                w='100%'
                borderColor='#424242'
                bg='gray.900'
                color='white'
                mb={3}
              />

              <Stack mb={6} align="center" direction="row" >
                <Text fontWeight="bold" color='white' >Desativar corte</Text>
                <Switch
                  colorScheme="red"
                  size="lg"
                 />
              </Stack>

              <Button
                w='100%'
                size='lg'
                color='gray.900'
                bg='button.cta'
                mb={6}
                _hover={{ bg:'#FFB13E'}}
              >
                Salvar
              </Button>


            </Flex>

          </Flex>

        </Flex>
      </Sidebar>
    </>
  )
}