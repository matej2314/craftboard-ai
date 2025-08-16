'use client';

import { Icon } from '@iconify/react';

// function SignInDefault() {
// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		// Handle form submission here
// 		console.log('Form submitted');
// 	};

export default function SignIn() {
	return (
		<main className='bg-gray-200 w-screen h-screen flex justify-center items-center'>
			<div className='w-full h-full flex justify-center items-center'>
				{/* Sign in section */}
				<div className='w-full flex-col items-center justify-center md:pl-4 lg:pl-0 xl:max-w-[420px] bg-white rounded-xl pl-2'>
					<h3 className='w-full flex justify-center mb-2.5 text-4xl font-bold text-navy-700'>Sign In</h3>
					<p className='w-full flex justify-center mb-9 text-base text-gray-600'>Enter your email and password to sign in!</p>
					<div className='mb-6 flex h-[50px] w-1/2 items-center justify-self-center justify-center gap-2 rounded-xl bg-slate-300/40 hover:bg-slate-300/60 hover:cursor-pointer'>
						<div className='rounded-full text-xl'>
							<Icon icon='flat-color-icons:google' width={24} height={24} />
						</div>
						<p className='text-sm font-medium text-navy-700'>Sign In with Google</p>
					</div>
					<form className='w-full flex flex-col justify-center items-center pl-2'>
						{/* Email */}
						<div className='w-11/12 mb-3'>
							<label htmlFor='email' className='mb-2 block text-sm font-medium text-navy-700'>
								Email*
							</label>
							<input id='email' name='email' type='email' required placeholder='mail@simmmple.com' className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 placeholder-gray-600 focus:border-brand-500 focus:outline-none' />
						</div>

						{/* Password */}
						<div className='w-11/12 mb-3'>
							<label htmlFor='password' className='mb-2 block text-sm font-medium text-navy-700'>
								Password*
							</label>
							<input id='password' name='password' type='password' required placeholder='Min. 8 characters' className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 placeholder-gray-600 focus:border-brand-500 focus:outline-none' />
						</div>

						{/* Checkbox */}
						<div className='mb-4 flex flex-col items-center justify-center px-2 gap-2'>
							<div className='mt-2 flex items-center'>
								<input type='checkbox' id='keep-logged-in' name='keepLoggedIn' className='h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500' />
								<label htmlFor='keep-logged-in' className='ml-2 text-sm font-medium text-navy-700'>
									Keep me logged In
								</label>
							</div>
							<a className='text-sm font-medium text-blue-300 hover:text-blue-400' href=' '>
								Forgot Password?
							</a>
						</div>

						<button type='submit' className='w-1/2 flex justify-center rounded-xl bg-blue-500 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-blue-600 active:bg-blue-700'>
							Sign In
						</button>
					</form>

					<div className='w-full flex justify-center items-center my-4'>
						<span className='text-sm font-medium text-navy-700'>Not registered yet?</span>
						<a className='ml-1 text-sm font-medium text-blue-400 hover:text-blue-500'>Create an account</a>
					</div>
				</div>
			</div>
		</main>
	);
}
