import Head from "next/head";
import { 
   Flex,
   Text,
   Heading,
   Button,
   Link as ChakraLink,
   useMediaQuery
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { IoMdPerson } from 'react-icons/io'

import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)")
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

        <ChakraLink
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
            mb={4}
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
                  Junior Braz
              </Text>
            </Flex>

            <Text fontWeight='bold' color='#F1F1F1' mb={isMobile ? 2 : 0} >Corte completo</Text>
            <Text fontWeight='bold' color='#F1F1F1' mb={isMobile ? 2 : 0} >R$ 59.90</Text>

          </Flex>
        </ChakraLink>

      </Flex>
    </Sidebar>
  </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {
      
    }
  }
})