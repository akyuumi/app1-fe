import React from 'react';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const handleButtonClick = async (): Promise<void> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/hello`);
      const data = await response.text();
      console.log(data); // コンソールに "Hello World" を表示
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <> 
      <button onClick={handleButtonClick}>Click Me</button>
    </>
  );
  
};

export default HomePage;
