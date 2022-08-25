import { FC } from 'react';
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';
import { ConnectGithub } from 'components/ConnectGithub';

// TO DO: Make a flow to interact with an anchor function and add the github id to anchor.
// supabase.auth.user gives you the github id of the logged in user

export const ConnectView: FC = ({}) => {
  return (
    <div className='md:hero mx-auto p-4'>
      <div className='md:hero-content flex flex-col'>
        <h1 className='text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]'>
          Connect Github Account
        </h1>
        {/* CONTENT GOES HERE */}
        <div className='text-center'>
          <ConnectGithub />
        </div>
      </div>
    </div>
  );
};
