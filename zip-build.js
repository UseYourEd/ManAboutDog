import AdmZip from 'adm-zip';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createZip() {
  const zip = new AdmZip();
  const sourcePath = path.join(__dirname, 'dist');
  const outPath = path.join(__dirname, 'Production-Site-Man-About-Dog.zip');
  
  // Add the entire dist folder 
  zip.addLocalFolder(sourcePath);
  
  // Write the zip file
  zip.writeZip(outPath);
  console.log(`Successfully created ZIP at ${outPath}`);
}

createZip();
