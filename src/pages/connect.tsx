import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectView } from '../views';
import { supabase } from '../utils/supabase';

const Connect: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name='description' content='Connect Github' />
      </Head>
      <ConnectView />
    </div>
  );
};

export default Connect;
