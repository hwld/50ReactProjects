import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { NextPage } from "next";
import React, { useState } from "react";
import { Header } from "../../components/Header";

const Game: NextPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#ffffff",
        color: "#ffffff",
        fontSize: "16px",
      },
    },
  };

  const handleClose = () => {
    onClose();
    setError(null);
  };

  const handleClick = async () => {
    setError(null);
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: "" }),
    });
    const data = await res.json();
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      setError(`支払いエラー: ${result.error.message}`);
      setProcessing(false);
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        onClose();
        setError(null);
        setProcessing(false);
        toast({
          title: "Payment successful.",
          description: "Credit card payment was successful.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Header />
      <Box maxW="1300px" mt={10} mx="auto">
        <Flex w="100%" wrap="wrap">
          <Image ml={10} boxSize="400px" src="/game.jpg" />
          <Box maxW="50%" mx={10} whiteSpace="pre-wrap">
            <Heading mt={10}>GameTitle</Heading>
            <Text ml={3} mt={1} fontSize="xl">
              ￥3000
            </Text>
            <Button
              ml={3}
              mt={3}
              pb={1}
              borderRadius="0"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              _active={{ bg: "blue.300" }}
              onClick={onOpen}
            >
              Buy Now
            </Button>
            <Text
              mt={6}
            >{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample`}</Text>
          </Box>
        </Flex>
        <Box mt={10} mx={10}>
          <Heading size="lg">More Details</Heading>
          <Text>{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleleSampleSampleSample`}</Text>
        </Box>
        <Box mt={10} mx={10}>
          <Heading size="lg">Reviews</Heading>
          <Text>{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample`}</Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Alert mb={5} status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <CardElement options={CARD_OPTIONS} />
          </ModalBody>
          <ModalFooter>
            <Button pb={1} mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button
              pb={1}
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              _active={{ bg: "blue.300" }}
              onClick={handleClick}
            >
              {processing ? <Spinner /> : "Pay"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Game;
