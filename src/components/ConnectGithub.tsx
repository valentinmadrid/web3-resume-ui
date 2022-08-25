import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import { FC, useCallback, useEffect, useState } from 'react';
import { notify } from '../utils/notifications';
import { supabase } from '../utils/supabase';

export const ConnectGithub: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = '';
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports: 1,
        })
      );

      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'confirmed');
      notify({
        type: 'success',
        message: 'Transaction successful!',
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: 'error',
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, notify, connection, sendTransaction]);

  const connectGithub = async () => {
    const { error } = await supabase.auth.signIn({
      provider: 'github',
    });
  };

  return (
    <div>
      <button
        className='group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... '
        onClick={connectGithub}
      >
        <span className='block group-disabled:hidden'>
          Connect Github Account
        </span>
      </button>
      {supabase.auth.user() ? (
        <button
          className='group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... '
          onClick={onClick}
        >
          <div className='hidden group-disabled:block '>
            Wallet not connected
          </div>
          <span className='block group-disabled:hidden'>Send Transaction</span>
        </button>
      ) : null}
    </div>
  );
};
