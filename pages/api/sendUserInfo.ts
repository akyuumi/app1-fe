import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POSTリクエストのみを許可
  if (req.method === 'POST') {
    // NextAuth.js でセッション情報を取得
    const session = await getSession({ req });
    if (session && session.user) {
      // ユーザー情報を含むリクエストボディ
      const body = JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      });

      // Goアプリケーションのエンドポイントにリクエストを送信
      const response = await fetch('http://localhost:8080/your-go-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      });

      // Goアプリからのレスポンスを取得
      const data = await response.json();

      // レスポンスをクライアントに送信
      res.status(200).json(data);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    // POSTリクエスト以外は許可しない
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
