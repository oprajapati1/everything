import { useCallback, useState } from 'react';
import axios from 'axios';
import { Container, Heading, Box } from '@chakra-ui/react';
import { Shortened } from './types';
import ShortenUrlForm from './ShortenUrlForm';
import UrlList from './UrlList';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
    },
    [urls]
  );

  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Heading as="h1" size="2xl" color="teal.500" marginBottom={5}>
        Om's URL Shortener
      </Heading>
      <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={6} boxShadow="xl">
        <ShortenUrlForm requestShortUrl={requestShortUrl} />
        <UrlList urls={urls} />
      </Box>
    </Container>
  );
}

export default App;