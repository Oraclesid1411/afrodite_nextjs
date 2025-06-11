import express from "express";
import fs from "fs";
import path from "path"; 
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname);
app.post('/api/save-image', (req, res) => {
  const file = req.files.file;
  const savePath = path.join(__dirname, 'public/uploads/images', file.name);

  fs.writeFile(savePath, file.data, (err) => {
    if (err) {
      console.error('Erreur lors de la sauvegarde du fichier:', err);
      return res.status(500).send('Erreur lors de la sauvegarde du fichier.');
    }

    res.status(200).send('Fichier sauvegardé avec succès.');
  });
});

app.listen(3000, () => {
  console.log('API pour la sauvegarde d\'images fonctionne sur le port 3000');
});