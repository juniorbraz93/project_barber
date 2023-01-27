import { useState, ChangeEvent } from "react";

import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import Link from "next/link";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from '@/services/api';
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface HaircutProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}
interface NewProps {
  haircuts: HaircutProps[]
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState('')
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0])
  const router = useRouter()

  function handleChangeSelect(id: string) {

    const haircutItem = haircuts.find(item => item.id === id)
    
    setHaircutSelected(haircutItem)
  }

  async function handleRegister() {

    if(customer === '') {
      toast.info('Preencha o nome do cliente. ')
      return;
    }
    
    try {

      const apiClient = setupAPIClient()

      await apiClient.post('/schedule', {
        haircut_id: haircutSelected?.id,
        customer: customer
      })   
      
      toast.success('agendamento registrado com sucesso!😊')
      router.push('/dashboard')

    } catch (error) {
      console.log(error);
      toast.error('Erro ao registrar agendamento!😥')
    }
  }

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
            <Button bg='#2D3748' _hover={{ bg: 'gray.900'}} >Voltar</Button>
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
              mb={3}
              size='lg'
              w='85%'
              bg='barber.900'
              onChange={ (e) => handleChangeSelect(e.target.value) }
            >
              {
                haircuts?.map(item => (
                  <option style={{ backgroundColor: '#FFF', color: '#000' }} key={item?.id} value={item?.id} >
                    {item?.name}
                  </option>
                ))
              }
            </Select>

            <Button
              w='85%'
              size='lg'
              color='gray.900'
              bg='button.cta'
              _hover={{ bg: '#FFB13E' }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

          </Flex>

    
        </Flex>
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
    
    if (response.data === null) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }    
    }
    
    return {
      props: {
        haircuts: response.data,
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