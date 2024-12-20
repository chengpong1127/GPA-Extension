import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { set_token, get_token, check_token_validity } from './utils/get_course';

export default function App() {
  const [valid, setValid] = useState(null);
  const [token, setToken] = useState('');
  useEffect(() => {
    check_token_validity().then(setValid);
    get_token().then(setToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-[400px] min-w-[400px]">
      <h1 className="text-4xl font-bold mb-6">GPA Extension</h1>
      <p className="mb-4">Get the token from <a href="https://gpa.myntust.com/APIService" className="text-blue-500 underline">https://gpa.myntust.com/APIService</a></p>
      <TextEditor 
        initialContent={token} 
        onConfirm={(value) => {
          set_token(value);
          check_token_validity().then(setValid);
          setToken(value);
        }}
        onCancel={() => check_token_validity().then(setValid)}
      />
      {valid !== null && (
        <div>
          <p className={`mb-4 ${valid ? 'text-green-500' : 'text-red-500'}`}>
            Token validity: {valid ? 'Valid' : 'Invalid'}
          </p>
        </div>
      )}
    </div>
  );
}

function TextEditor({ onConfirm, onCancel, initialContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  function handleConfirm() {
    onConfirm(content);
    setIsEditing(false);
  }

  function handleCancel() {
    onCancel();
    setIsEditing(false);
    setContent(initialContent);
  }

  if (!isEditing) {
    return (
      <div className="flex flex-row bg-gray-100">
        <input
          className="w-[250px] h-[30px] pl-[10px] rounded-lg m-3"
          type="text"
          value={content}
          readOnly
        />
        <Button 
        className="pr-[30px] pl-[30px]"
          imgSrc="icons/edit.svg" alt="Edit" onClick={() => setIsEditing(true)} />
        <div></div>
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-gray-100">
      <input
        className="w-[250px] h-[30px] pl-[10px] rounded-lg m-3"
        type="text"
        value={content}
        onChange={(e) => { setContent(e.target.value); console.log(e.target.value); }}
      />
      <Button imgSrc="icons/confirm.svg" alt="Confirm" onClick={handleConfirm} />
      <Button imgSrc="icons/cancel.svg" alt="Cancel" onClick={handleCancel} />
    </div>
  );
}

TextEditor.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialContent: PropTypes.string.isRequired,
};

function Button({ imgSrc, alt, onClick }) {
  return (
    <button 
      className="transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300 w-8 h-8 flex justify-center items-center rounded-lg m-3"
      onClick={onClick}>
      <Icon imgSrc={imgSrc} alt={alt} />
    </button>
  );
}

Button.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Icon({ imgSrc, alt }) {
  return <img src={imgSrc} alt={alt} />;
}

Icon.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};