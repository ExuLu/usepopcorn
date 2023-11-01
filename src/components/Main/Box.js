import { useState } from 'react';
import Button from './Button.js';

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <Button onClick={setIsOpen} isOpen={isOpen} />
      {isOpen && children}
    </div>
  );
}
