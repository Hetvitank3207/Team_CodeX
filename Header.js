import React from 'react';

const Header = ({ title }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#d32f2f',
    padding: '15px 0',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },
  title: {
    margin: 0,
    fontSize: '28px',
  }
};

export default Header;
