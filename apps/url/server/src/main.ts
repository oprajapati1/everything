import express from 'express';
import cors from 'cors';
import { shortenUrl, lookupUrl } from './persist';
import QRCode from 'qrcode';

type MainDependencies = {
  shortenUrl: (original: string) => Promise<id: number, short: string>;
  lookupUrl: (shortId: number) => Promise<string>;
};

// Composition Root
const deps: MainDependencies = {
  shortenUrl,
  lookupUrl,
};

async function main({ shortenUrl, lookupUrl }: MainDependencies) {
  const app = express();
  app.use(express.json());
  app.use(cors());
  console.log('Starting server');

  app.post('/api/shorten', async (req, res) => {
    const original = req.body.original;
    const result = await shortenUrl(original);

    console.log("Result from shortenUrl:", result);

    res.send(result);
  });


  app.get('/s/:id', async (req, res) => {
    const id = Number(req.params.id);
    const original = await lookupUrl(id);
    res.redirect(original);
  });

  // New endpoint for generating QR Code
  app.get('/api/qr/:id', async (req, res) => {
    const id = Number(req.params.id);
    console.log(`Received ID: ${id}`);  // Log the id received in the request

    let original;
    try {
      original = await lookupUrl(id);
      console.log(`Original URL: ${original}`);  // Log the original URL retrieved
    } catch (err) {
      console.error('Error with lookupUrl:', err);
      res.status(500).send({error: 'Error looking up URL'});
      return;
    }

    if (!original) {
      res.status(404).send({error: 'Not found'});
      return;
    }

    try {
      const qr = await QRCode.toDataURL(original);
      res.send({qr});
    } catch (err) {
      console.error('Error generating QR code:', err);
      res.status(500).send({error: 'Failed to create QR code'});
    }
  });



  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main(deps);
