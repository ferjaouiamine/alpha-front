import React from 'react'
import {
  Image,
  Box,
  chakra,
  Container,

  Stack,
  
  VisuallyHidden,
 
  useColorModeValue,
  
} from '@chakra-ui/react';

import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialButton = ({
  children,
  href,
}) => {
  return (
    <chakra.button
 
      rounded={'full'}
    w={8}
    h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
   >

      {children}
    </chakra.button>
  );
};

const AvantNav = () => {
  return (
    <>
      <Box mt={8} >
       <Link to="/">
        <Image 
        src="https://scontent.ftun10-1.fna.fbcdn.net/v/t1.15752-9/279591253_351829813679739_4436084117887758737_n.png?_nc_cat=100&ccb=1-6&_nc_sid=ae9488&_nc_ohc=8cnl6Qc-cTcAX_4yYPM&tn=9tNJLs7ZjxrMf1Y4&_nc_ht=scontent.ftun10-1.fna&oh=03_AVKOIw9lyUCkRpmYy2Xh_x3kvYP9ctsmTwqMRLrx7Gz3Vw&oe=629BC97F" 
        w={300}
        ml={500}
        >

        </Image>
        </Link>
        <Box
         >
          <Container ml={1100} mt={-55} mb={50}>
            <Stack spacing={1} >
              <Stack direction={'row'} spacing={6} >
                <SocialButton label={'Twitter'} href={'#'}  >
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'#'}>
                  <FaFacebook />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'#'}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Stack>

          </Container>
        </Box>
      </Box>
      
    </>
  )
}

export default AvantNav