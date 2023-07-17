import { Box, Button, Flex, Image, Link, Text, useClipboard } from '@chakra-ui/react';
import { Shortened } from './types';
import axios from 'axios';
import { useState } from 'react';

type UrlListProps = {
  urls: Array<Shortened>;
};

export const UrlList: React.FC<UrlListProps> = ({ urls }) => {
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});
  const { onCopy } = useClipboard("");

  const getQrCode = async (id: number) => {
    console.log('Getting QR Code for ID:', id);
    const response = await axios.get(`http://localhost:3333/api/qr/${id}`);
    const qrCodeUrl = response.data.qr;
    window.open(qrCodeUrl, "_blank");
  };

  const handleCopy = (url: string) => {
    onCopy(url);
  }

  return (
    <Flex direction="column" alignItems="start" gridGap={4}>
      {urls.map((u) => (
        <Box
          key={u.id}
          width="full"
          borderWidth={1}
          borderRadius="md"
          padding={4}
          boxShadow="base"
        >
          <Flex justify="space-between" alignItems="center">
            <Box>
              <Text fontWeight="bold" fontSize="lg" marginBottom={1}>
                <Link href={u.short} color="teal.500">
                  {u.short}
                </Link>
              </Text>
              <Text color="gray.600">{u.original}</Text>
            </Box>
            <Button colorScheme="teal" onClick={() => getQrCode(u.id)}>
              Get QR Code
            </Button>
          </Flex>
          {qrCodes[u.short] && (
            <Box marginTop={4}>
              <Image src={qrCodes[u.short]} alt="QR Code" />
            </Box>
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default UrlList;
