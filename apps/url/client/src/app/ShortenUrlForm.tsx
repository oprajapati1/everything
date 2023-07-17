import { Button, Input } from '@chakra-ui/react';
  import { FormEvent, useCallback, useState } from 'react';

  type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
  };

  export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ requestShortUrl }) => {
    const [inputUrl, setInputUrl] = useState<string>('');
      const [isLoading, setIsLoading] = useState<boolean>(false); // Add this line

        const onSubmit = useCallback(
        async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true); // Add this line
        await requestShortUrl(inputUrl);
        setIsLoading(false); // Add this line
        setInputUrl('');
        },
        [inputUrl, requestShortUrl]
        );

        return (
        <form onSubmit={onSubmit}>
        <Input
          id="url-input"
          size="lg"
          marginBlock={4}
        value={inputUrl}
        onChange={(e) => {
        setInputUrl(e.target.value);
        }}
        placeholder="www.my-super-long-url-here.com/12345"
        />
        <Button id="submit-btn" type="submit" colorScheme="teal" size="lg" >
          Shorten
      </Button>
    </form>
    );
    };

    export default ShortenUrlForm;
