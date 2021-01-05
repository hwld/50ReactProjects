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
  useDisclosure,
} from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions, StripeError } from "@stripe/stripe-js";
import { NextPage } from "next";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";

const Game: NextPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

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
    setSucceeded(false);
  };

  const handleClick = async () => {
    setError(null);
    setSucceeded(false);
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
        setSucceeded(true);
        setError(null);
        setProcessing(false);
      }
    }
  };

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: "" }),
    })
      .then((r) => r.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <Header />
      <Box maxW="1300px" mt={10} mx="auto">
        <Flex w="100%" wrap="wrap">
          <Box ml={10} boxSize="400px" bg="blue.500" />
          <Box maxW="50%" mx={10} whiteSpace="pre-wrap">
            <Heading mt={10}>GameTitle</Heading>
            <Text
              mt={6}
            >{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample`}</Text>
            <Button
              mt={6}
              pb={1}
              borderRadius="0"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              _active={{ bg: "blue.300" }}
              onClick={onOpen}
            >
              Buy Now
            </Button>
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
            {succeeded && (
              <Alert mb={5} status="success">
                <AlertIcon />
                支払いに成功しました
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
