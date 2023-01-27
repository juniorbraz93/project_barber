import Head from 'next/head'
import Image from 'next/image'

import { Button, Center, Flex, Text} from '@chakra-ui/react'
import logoImg from '../../public/images/logo.svg'
import Link from 'next/link'
import { canSSRGuest } from '@/utils/canSSRGuest'


export default function Home(){
  return(
    <>
      <Head>
        <title>BarberPRO - Seu sistema completo</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center" direction='column'>
        <Image 
                src={logoImg}
                quality={100}
                width={360}
                alt='Logo barberpro'
                />

          <Center mt={2}>
            <Link href='/login'>
              <Button
                  backgroundColor='button.cta'
                  mb={6}
                  mr={2}
                  color='#FFF'
                  size='lg'
                  _hover={{ bg: "#FFB13E" }}
                >
                  Fazer o Login
                </Button>
            </Link>
            <Link href='/register'>
              <Button
                  backgroundColor='button.cta'
                  mb={6}
                  color='#FFF'
                  size='lg'
                  _hover={{ bg: "#FFB13E" }}
                >
                  Registra-se
                </Button>
            </Link>
          </Center>
          
      </Flex>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})