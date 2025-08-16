import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtVerify, SignJWT, importPKCS8, importSPKI } from 'jose';

const privateKeyPath = path.join(process.cwd(), 'keys', 'private.key');
const publicKeyPath = path.join(process.cwd(), 'keys', 'public.key');

const privateKeyPEM = fs.readFileSync(privateKeyPath, 'utf8');
const publicKeyPEM = fs.readFileSync(publicKeyPath, 'utf8');

const privateKeyPromise = importPKCS8(privateKeyPEM, 'RS256');
const publicKeyPromise = importSPKI(publicKeyPEM, 'RS256');

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'E-mail', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: any) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.users.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error('User not found');
				}

				const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
				if (!passwordsMatch) {
					throw new Error('Invalid password');
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					profession: user.profession,
				};
			},
		}),
	],
	session: { strategy: 'jwt' },
	jwt: {
		async encode({ token }) {
			if (!token) return '';
			const privateKey = await privateKeyPromise;
			return await new SignJWT(token as any).setProtectedHeader({ alg: 'RS256' }).setIssuedAt().setExpirationTime('1h').sign(privateKey);
		},
		async decode({ token }) {
			if (!token) return null;
			try {
				const publicKey = await publicKeyPromise;
				const { payload } = await jwtVerify(token, publicKey);
				return payload as any;
			} catch (err) {
				console.error('JWT verify failed:', err);
				return null;
			}
		},
	},
	cookies: {
		sessionToken: {
			name: '__Secure-next-auth.session-token',
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/dashboard',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
