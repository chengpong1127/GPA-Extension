import { useState, useEffect } from 'react';
import { set_token, get_token, check_token_validity } from './utils/get_course';
import { Button, Input } from "@nextui-org/react";

export default function App() {
  const [valid, setValid] = useState(null);
  const [token, setToken] = useState('');
  useEffect(() => {
    check_token_validity().then(setValid);
    get_token().then(setToken);
  }, []);

  return (
    <main className="flex flex-col items-center bg-stone-50 min-h-72 min-w-[420px]">
      <h1 className="text-3xl font-bold p-8">GPA Extension</h1>
      <p className="p-2">Get the token from <a href="https://gpa.myntust.com/APIService" className="text-blue-500 underline">https://gpa.myntust.com/APIService</a></p>
      <div className='flex flex-row items-center space-x-4'>
        <Input 
          className='w-80 text-xs'
          defaultValue={token}
          label="Token"
          placeholder='Enter your token here'
          value={token}
          onValueChange={
          (value) => {
            set_token(value);
            setToken(value);
          }
        }
        />
        <Button 
          className='text-xs'
          size='sm'
          onPress={() => check_token_validity().then(setValid)}>
          Test
        </Button>
      </div>
      
      {valid !== null && (
        <p className={`p-4 ${valid ? 'text-green-400' : 'text-red-400'}`}>
        Token validity: {valid ? 'Valid' : 'Invalid'}
        </p>
      )}
    </main>
  );
}
