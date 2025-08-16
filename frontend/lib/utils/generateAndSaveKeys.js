import { generateKeyPair, exportPKCS8, exportSPKI } from 'jose';
import fs from 'fs';
import path from 'path';

async function generateAndSaveKeys() {
	const keysDir = path.join(process.cwd(), '..', '..', '..', 'keys');
	const privateKeyPath = path.join(keysDir, 'private.key');
	const publicKeyPath = path.join(keysDir, 'public.key');

	if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir);

	if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
		console.log('Keys already exist');
		return;
	}

	const { publicKey, privateKey } = await generateKeyPair('RS256', {
		modulusLength: 2048,
		crv: 'P-256',
		use: 'sig',
		alg: 'RS256',
		kid: 'board-key',
		extractable: true,
	});

	const privateKeyPEM = await exportPKCS8(privateKey);
	const publicKeyPEM = await exportSPKI(publicKey);

	fs.writeFileSync(privateKeyPath, privateKeyPEM);
	fs.writeFileSync(publicKeyPath, publicKeyPEM);

	console.log('Keys generated and saved successfully');
}

generateAndSaveKeys();
