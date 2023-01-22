import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard() {
  return (
  <>
    <Head>
      <title>BarbePro - Minha barbearia</title>
    </Head>
    <Flex>
      <Text>bam vindo ao dashboard</Text>
    </Flex>
  </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {
      
    }
  }
})