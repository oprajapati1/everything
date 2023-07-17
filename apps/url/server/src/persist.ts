import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let _db;

async function getDB() {
  if (_db == null) {
    const conn = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    _db = conn;
    await _db.run('CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);');
  }
  return _db;
}

export async function shortenUrl(url: string): Promise<{short: string, id: number}> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  console.error('Database insert result: ', result);

  const id = result.lastID;
  const short = `http://localhost:3333/s/${id}`;

  console.error('Returning from shortenUrl: ', {short, id});


  return { short, id };
}

export async function lookupUrl(shortenedId: number) {
  const db = await getDB();

  const result = await db.get('SELECT original FROM url WHERE id = (?)', shortenedId);
  return result.original;
}
