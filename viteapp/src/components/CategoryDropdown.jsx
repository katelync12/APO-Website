import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const CategoryDropdown = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  // Fetch categories from the backend
  useEffect(() => {
    fetch('/api/get_categories/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories: ', error);
        setError('Could not load categories');
      });
  }, []);

  const handleChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Form.Control
        as="select"
        multiple
        value={selectedCategories}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </div>
  );
};

export default CategoryDropdown;