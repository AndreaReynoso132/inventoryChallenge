import React, { useState } from 'react';

const ProductFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value); // Llama a la función onFilter cada vez que cambia el término de búsqueda
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleChange}
        style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
      />
    </div>
  );
};

export default ProductFilter;
