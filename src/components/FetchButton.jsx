import PropTypes from 'prop-types';

export default function FetchButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        borderRadius: '25%',
        margin: 'auto',
        width: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DDD'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#AAA'}
      onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#DDD'}
    >
      <SearchIcon />
    </button>
  );
}

FetchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
  );
}