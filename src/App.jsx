import { useState, useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let validChars = letters;
    if (includeNumbers) validChars += numbers;
    if (includeSymbols) validChars += symbols;    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }
    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSymbols, setPassword]); 

  useEffect(() => {
    generatePassword();
  }, [length,includeNumbers,includeSymbols,generatePassword]);

  const copytoClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    
  }
  
  return (
    <>
      <div className='w-[60vw] mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500
      bg-gray-800'>
        <h3 className='text-center text-white font-bold'>Password Generator</h3>
        <div className='flex items-center justify-center w-full mt-2 h-8'>
          <input
          type="text"
          readOnly
          value={password}
          placeholder='Your Secure Password'
          ref={passwordRef}
          className='bg-white w-full px-1 rounded-l-md h-full'
          />
          <button
          onClick = {copytoClipboard}
          className='bg-blue-700 px-2 rounded-r-md h-full text-white  font-bold cursor-pointer'>Copy</button>
        </div>
        <div className='flex flex-wrap items-center justify-center w-full mt-2'>
          <input
          type="range"
          min="0"
          max="100"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="cursor-pointer"
          />
          <label className='text-white ml-1'>Length:{length}</label>
          <input
          type="checkbox"
          id="numbers"
          defaultChecked={includeNumbers}
          onChange={() => setIncludeNumbers((prev)=>!prev)}
          className='ml-6 cursor-pointer'
          />
          <label htmlFor='numbers' className='text-white ml-1 cursor-pointer'>Numbers</label>
          <input
          type="checkbox"
          id="symbols"
          defaultChecked={includeSymbols}
          onChange={() => setIncludeSymbols((prev)=>!prev)}
          className='ml-6 cursor-pointer' 
          />
          <label htmlFor='symbols' className='text-white ml-1 cursor-pointer'>Symbols</label>
        </div>
      </div>
    </>
  )
}

export default App
