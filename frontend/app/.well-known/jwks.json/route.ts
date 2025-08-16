import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { importSPKI, exportJWK } from 'jose';

export async function GET() {
	const publicKeyPath = path.join(process.cwd(), 'keys', 'public.key');
	const publicKeyPEM = fs.readFileSync(publicKeyPath, 'utf8');

	const publicKey = await importSPKI(publicKeyPEM, 'RS256');

	const jwk = await exportJWK(publicKey);

	const jwkWithMeta = {
		...jwk,
		crv: 'P-256',
		use: 'sig',
		alg: 'RS256',
		kid: 'board-key',
	};

	return NextResponse.json({ keys: [jwkWithMeta] }, { status: 200 });
}
