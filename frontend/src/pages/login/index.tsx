import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button} from '@chakra-ui/react'

export default function Login(){
  return(
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8} >
          <Center p={4} >
            <Image 
              src={logoImg}
              quality={100}
              width={240}
              objectFit="fill"
              alt='Logo barberpro'
              />

          </Center>

          <Input
            background="barber.400"
            variant='filled'
            size="lg"
            placeholder='email@email.com'
            type='email'
            mb={3}
          />

          <Input
            background="barber.400"
            variant='filled'
            size="lg"
            placeholder='**********'
            type='text'
            mb={6}
          />

          <Button
            backgroundColor='button.cta'
            mb={6}
            color='gray.900'
            size='lg'
            _hover={{ bg: "#FFB13E" }}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href='/register'>
              <Text color="#FFF" cursor='pointer' >Ainda não possui uma conta? <strong>Cadastre-se</strong></Text>
            </Link>
          </Center>

        </Flex>
      </Flex>
    </>
  )
}