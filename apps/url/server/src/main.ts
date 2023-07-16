import express from 'express';
import cors from 'cors';
import { shortenUrl, lookupUrl } from './persist';
import path from 'path';

type MainDependencies = {
  shortenUrl: (original: string) => Promise<string>;
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

  app.use(express.static(path.join(__dirname, '../../../../../../dist/apps/url/client')));

  app.post('/api/shorten', async (req, res) => {
    const original = req.body.original;
    const short = await shortenUrl(original);

    res.send({
      short: short,
      original: original,
    });
  });

  app.get('/s/:id', async (req, res) => {
    const id = Number(req.params.id);
    const original = await lookupUrl(id);
    res.redirect(original);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../../../dist/apps/url/client/index.html'));
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main(deps);
