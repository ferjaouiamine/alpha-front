import React from 'react'
import { Box, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { Heading } from "@chakra-ui/react";
import {
  Container,
  Stack,
  Text
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';


const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Sliderone = () => {
  const [slider, setSlider] = React.useState(null);


  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  const cards = [
    {
      title: 'Alpha Learning',
      text:
        "Le secret de votre réussite.",
      image:
        'http://dannci.wpmasters.org/learnpress/edulogy/wp-content/uploads/sites/2/2020/04/selective-focus-photo-of-man-using-laptop-1438081-1920x1000.jpg',
    },
    {
      title: 'Votre avenir commence ici',
      text:
        "Apprenez à apprendre, découvrez les compétences de demain et prenez votre carrière en main.",
      image:
        'http://dannci.wpmasters.org/learnpress/edulogy/wp-content/uploads/sites/2/2020/04/group-of-people-sitting-inside-room-2422294-1920x1000.jpg',
    },
    {
      title: 'Cours en live',
      text:
        "Les vidéos enregistrées sont disponible 24h/24 et 7j/7 et avec une durée illimitée !",
      image:
        'https://www.selexium.com/app/uploads/2021/03/Les-5-bonnes-pratiques-pour-revendre-son-bien-LMNP.jpg',
    },
    {
      title: 'Utilisation simple',
      text:
        "Une utilisation simple et efficace, à la portée de tous et en quelques clics.",
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80&fbclid=IwAR2mU_zMs72ouZbxGH2a8EKyf_3ttZC691tuvEuM5dRN92WPKBNtjJSXc9Q',
    }
  ];

  return (
    <>
    <Box
      position={'relative'}
      height={'600px'}
      width={{base:'',lg:'full'}}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'4xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}>
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)">
                <Heading mt={300} color="white" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text color="white" fontSize={{ base: 'md', lg: 'lg' }} >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
       
</>


  )
}

export default Sliderone 