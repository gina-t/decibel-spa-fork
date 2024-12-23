import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth'; 
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useAcceptedUsers } from '../hooks/useAcceptedUsers';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { addAcceptedUser } = useAcceptedUsers();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Replace this with your actual login logic
    const idToken = 'eeccfb235c13764169cc452a896cd0c6733cae0d04239da39d29344badc7729273309ab2cc6b876bec9f892030d68742ee5b3a725dc09c6cdd96effb545de8cf'; 
    const user = { id: Date.now(), username, email, password }; 

    // Log in the user using AuthService
    AuthService.login(idToken, user);

    // Add the user to the accepted users list
    addAcceptedUser(user);

    // Redirect to the AlbumSearch page
    navigate('/album-search');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Decibel logo" src={logo} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-xl font-semibold tracking-tight text-white sm:text-4xl">
          Log in 
        </h2>
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm/6 font-medium text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label 
                htmlFor="password" 
                className="block text-sm/6 font-medium text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{' '}
          <Link to="/registration" 
            className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;