import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const Avisvisiteur = () => {
  return (
      <>
    <Box px="200px" py="60px" bg="yellow.50">
    <Heading fontSize={42} letterSpacing="4px" color="blue.900" pb="80px">
      The people have spoken
    </Heading>
    </Box>
     <Grid templateColumns="repeat(3, 1fr)" gap="60px">
     <Box w="full" px="40px" py="20px" bg="#3f51b5">
      <Flex alignItems="center" pb="20px">
        <Avatar src="https://github.com/Buupu/web-agency-landing-page/blob/main/src/assets/man-portrait1x1.jpg?raw=true" mr="20px"></Avatar>
        <Box>
          <Heading fontSize={16} color="whiteAlpha.900" mb="2px">
            Zac Walker
          </Heading>
          <Text fontSize={12} color="gray.500">
            Founder of mock.io
          </Text>
        </Box>
      </Flex>
      <Text color="whiteAlpha.900" fontSize={14}>
        "Exercitation incididunt incididunt officia velit ullamco nulla
        reprehenderit labore ullamco. Consectetur laborum velit est magna veniam
        id minim deserunt. Aliquip culpa nisi irure est sunt cillum duis."
      </Text>
    </Box>
    <Box w="full" px="40px" py="20px" bg="#3f51b5">
      <Flex alignItems="center" pb="20px">
        <Avatar src="https://bit.ly/dan-abramov" mr="20px"></Avatar>
        <Box>
          <Heading fontSize={16} color="whiteAlpha.900" mb="2px">
            Dan abramov
          </Heading>
          <Text fontSize={12} color="gray.500">
            Designer
          </Text>
        </Box>
      </Flex>
      <Text color="whiteAlpha.900" fontSize={14}>

        People really like the way it works. And they find it easy. I actually did not have to answer a single support call, so they did not have problems using Eduology.
      </Text>
    </Box>
    <Box w="full" px="40px" py="20px" bg="#3f51b5">
      <Flex alignItems="center" pb="20px">
        <Avatar src="https://bit.ly/tioluwani-kolawole" mr="20px"></Avatar>
        <Box>
          <Heading fontSize={16} color="whiteAlpha.900" mb="2px">
            tioluwani kolawole
          </Heading>
          <Text fontSize={12} color="gray.500">
            teacher
          </Text>
        </Box>
      </Flex>
      <Text color="whiteAlpha.900" fontSize={14}>

        People really like the way it works. And they find it easy. I actually did not have to answer a single support call, so they did not have problems using Eduology.
      </Text>
    </Box>


     </Grid>
     </>
  )
}

export default Avisvisiteur