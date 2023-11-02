import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextPage } from 'next';

const Login: NextPage = () => {

  // セッション情報取得
  const { data: session } = useSession();

  // セッション情報をバックエンドに渡す
  async function sendUserInfoToBackend(): Promise<void> {
    try {
      const response = await fetch('/api/sendUserInfo', {
        method: 'POST'
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to send user info to backend', error);
    }
  }

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  );
};

export default Login;