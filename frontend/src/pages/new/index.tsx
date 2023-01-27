import { useState, ChangeEvent } from "react";

import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import Link from "next/link";

export default function New() {
  const [customer, setCustomer] = useState('')

  return (
    <>
      <Head>
        <title>BarbePro - Novo agendamento</title>
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
              Novo agendamento
            </Heading>
            
          <Link
            href='/dashboard'
          >
            <Button bg='#2D3748' color='#FFF' >Voltar</Button>
          </Link>        
          </Flex>
          
          <Flex
            maxW='700px'
            pt={8}
            pb={8}
            w='100%'
            direction='column'
            align='center'
            justify='center'
            bg='barber.400'
          >
            <Input
              placeholder="Nome do cliente"
              w='85%'
              mb={3}
              size='lg'
              type='text'
              bg='barber.900'
              value={customer}
              onChange={ (e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value) }
            />
            <Select
              color='#628096'
              mb={3}
              size='lg'
              w='85%'
              bg='barber.900'
            >
              <option key={1} value="Barbar completa">Barbar completa</option>
            </Select>

            <Button
              w='85%'
              size='lg'
              color='gray.900'
              bg='button.cta'
              _hover={{ bg: '#FFB13E' }}
            >
              Cadastrar
            </Button>

          </Flex>

    
        </Flex>
      </Sidebar>
    </>
  )
}