import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { NextPage } from 'next';

const Profile1: NextPage = () => {
  const { data: session } = useSession({ required: true });

  return (
    <>
      {
        // セッションがある場合は、プロファイルを表示する
        session && (
          <div>
            <h1>プロファイル</h1>
            <div>{session.user?.email}</div>
            {session.user?.image && (
              <div>
                <Image src={session.user?.image} alt="" width={96} height={96} />
              </div>
            )}
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )
      }
      {
        // セッションがない場合は、ログインページに遷移する
        !session && (
          <div>
            <p>You are not signed in.</p>
          </div>
        )
      }
    </>
  );
};

export default Profile1;