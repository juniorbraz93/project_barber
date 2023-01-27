import { useState, ChangeEvent } from "react";

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

 import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from '@/services/api';

import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";

interface HaircutProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription: SubscriptionProps | null
}


export default function EditHaircut({ haircut, subscription }: EditHaircutProps ) {
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  const [name, setName] = useState(haircut?.name)
  const [price, setPrice] = useState(haircut?.price)
  const [status, setStatus] = useState(haircut?.status)

  const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? 'disabled' : 'enabled')

  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === 'disabled') {
      setDisableHaircut('enabled')
      setStatus(false)
    } else {
      setDisableHaircut('disabled')
      setStatus(true)
    }
  }

  async function handleUpdate(typ) {
    if (name === '' && price === '') {
      return;
    }
    try { 
      const apiClient = setupAPIClient()
      await apiClient.put('/haircut', {
        haircut_id: haircut?.id,
        name: name,
        price: Number(price),
        status: status

      })

      alert('Corte atualizado copm sucesso!')
    } catch (error) {
      console.log(error);
      
    }
  }

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
                disabled={subscription?.status !== 'active'}
                value={name}
                onChange={ (e) => setName(e.target.value) }
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
                disabled={subscription?.status !== 'active'}
                value={price}
                onChange={ (e) => setPrice(e.target.value) }
              />

              <Stack mb={6} align="center" direction="row" >
                <Text fontWeight="bold" color='white' >Desativar corte</Text>
                <Switch
                  colorScheme="red"
                  size="lg"
                  value={disableHaircut}
                  isChecked={disableHaircut === 'disabled' ? false : true}
                  onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e) }
                 />
              </Stack>

              <Button
                w='100%'
                size='lg'
                color='gray.900'
                bg='button.cta'
                mb={6}
                _hover={{ bg:'#FFB13E'}}
                disabled={subscription?.status !== 'active'}
                onClick={handleUpdate}
              >
                Salvar
              </Button>

              {
                subscription?.status !== 'active' && (
                  <Flex direction='row' align='center' justify='center' >
                    <Link href='/plans'>
                      <Text fontWeight='bold' color='#31FB6A' cursor='pointer' mr={1} >
                        Seja premium 
                      </Text>
                    </Link>
                    <Text color='white' >
                       e tenha todos acessos liberados.
                    </Text>
                  </Flex> 
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
  const { id } = ctx.params

  try {

    const apiClient = setupAPIClient(ctx)

    const check = await apiClient.get('/check')

    const response = await apiClient.get('/detail', {
      params: {
        haircut_id: id,
      }
    })    
    
    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/haircuts',
        permanent: false
      }
    }    
  }
})