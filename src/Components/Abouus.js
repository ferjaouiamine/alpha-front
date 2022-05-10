import React from 'react'


import {
  Flex, Heading, Link, Icon, Box, Text, AspectRatio,
  Img,
  Image,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import {
    VStack
  } from "@chakra-ui/react";
  import {
    Container,
    Stack,
  
  } from '@chakra-ui/react';


const Abouus = () => {
  return (
    <>
     <Container   maxW='' >
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
          >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            
            <br />
            <Text as={'span'} color={'rgba(66, 153, 225, 0.6)'}>
            Optez Alpha Learning que tout le monde peut utiliser            
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          Alpha Learning n’est pas seulement facile à mettre en place, il est facile à utiliser. Une interface simple et propre signifie que vos utilisateurs n’auront pas de mal à s’engager dans les cours. Tout ce qu’ils ont à faire est de se connecter et de commencer à apprendre.          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>

          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}>
            <IconButton
              aria-label={'Play Button'}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              size={'lg'}
              color={'white'}
              position={'absolute'}
              left={'50%'}
              top={'50%'}
              transform={'translateX(-50%) translateY(-50%)'}
            />
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
    <Box w="full" bg="#3f51b5
" px="400px" py="60px" mb="120px" id="abouus" >
      <Flex justifyContent="space-between" alignItems="center" pb="80px">
        <Heading fontSize={54} letterSpacing="6px" color="whiteAlpha.900">
          Qui sommes-nous ?<br />
        </Heading>
        <Box maxW="300px">
          <Text color="whiteAlpha.700" pb="20px">
          Alpha Learning est une plateforme d’enseignement en ligne destinée à tout le monde. 
          Les cours sont tutorés par des profs d’enseignement et des experts à travers des vidéos, des visioconférences et des supports PDF et restent accessibles sans limite de temps.
          Quelle que soit votre ambition, Alpha Learning peut vous aider à bâtir votre avenir.
          </Text>
          
        </Box>
      </Flex>
      <AspectRatio w="full" ratio={16 / 9} mb="-200px">
        <Img src="https://raw.githubusercontent.com/Buupu/web-agency-landing-page/main/src/assets/group16x9.jpg" pb="60px" />
      </AspectRatio>
    </Box>
    <Box w="full" py="60px" px="200px">
      <Flex justifyContent="space-between" alignItems="center" pb="60px">
        <Heading fontSize={42} letterSpacing="4px" color="blue.900">
        Votre avenir, <br /> notre priorité
        </Heading>
        <Text maxW="300px" color="blue.700">
        Notre unique objectif est de vous permettre de réaliser vos ambitions professionnelles.</Text>
      </Flex>
    </Box> 
    <Flex
      pl="200px"
      background="#3f51b5"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box py="60px" pr="140px">
        <Heading
          fontSize={25}
          letterSpacing="4px"
          color="whiteAlpha.900"
          pb="60px"
        >
Les meilleurs professeurs et les plus impliqués        </Heading>
        <VStack alignItems="flex-start" color="whiteAlpha.800" spacing="30px" >
          <Text>Nos professeurs hautement qualifiés vont vous fournir le soutien qu’il vous faut, <br />vous encourage et vous donne l’ambition et la motivation pour travailler davantage et d’exceller.<br /></Text>
        </VStack>
      </Box>
      <AspectRatio ratio={8 / 10} width="400px">
        <Img src="https://github.com/Buupu/web-agency-landing-page/blob/main/src/assets/pair-programming10x8.jpg?raw=true" />
      </AspectRatio>
    </Flex>
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} >
      <Image src='https://www.talentlms.com/wp-content/uploads/2021/04/floating-people5.png'></Image>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'rgba(66, 153, 225, 0.6)',
                zIndex: -1,
              }}>
              Mieux nous connaitre
            </Text>
            <br />{' '}
            <Text color={'rgba(66, 153, 225, 0.6)'} as={'span'}>
            Alpha Learning plateforme d’apprentissage et de education Tunisie            
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          accompagne les élèves et fait leur suivi tout au long de leur parcours scolaire.
          Nos professeurs hautement qualifiés vont vous fournir le soutien qu’il vous faut, Vous encourage et vous donne l’ambition et la motivation pour travailler davantage et d’exceller à travers :<br />
          -Des cours diffusés en direct présenté par des professeurs agrégés.<br />
          -Une bibliothèque De devoirs et d’activités conformes aux programmes officiels de chaque niveau.<br />
          -Des tests d’évaluation de niveaux (QCM, Quizz…).<br />
          -Un espace dédié pour poser vos diverses questions.<br /></Text>
        </Stack>
      </Flex>
    </Stack>
   
 </>
  )
}

export default Abouus