import React, { useState } from 'react';
const items = [
  { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
  { id: 2, name: 'Mobile', price: 500, category: 'Electronics' },
  { id: 3, name: 'Shirt', price: 20, category: 'Apparel' },
  { id: 4, name: 'Socks', price: 5, category: 'Apparel' },
  { id: 5, name: 'Chair', price: 85, category: 'Furniture' },
  { id: 6, name: 'Table', price: 120, category: 'Furniture' },
  { id: 7, name: 'Earphones', price: 30, category: 'Electronics' },
  { id: 8, name: 'Belt', price: 10, category: 'Apparel' },
  { id: 9, name: 'Couch', price: 300, category: 'Furniture' },
  { id: 10, name: 'Monitor', price: 250, category: 'Electronics' },
  { id: 11, name: 'Pants', price: 25, category: 'Apparel' },
  { id: 12, name: 'Mouse', price: 15, category: 'Electronics' },
  { id: 13, name: 'Keyboard', price: 40, category: 'Electronics' },
  { id: 14, name: 'Coffee Table', price: 50, category: 'Furniture' },
  { id: 15, name: 'Bed', price: 400, category: 'Furniture' },
  { id: 16, name: 'Jacket', price: 80, category: 'Apparel' },
  { id: 17, name: 'Shoes', price: 60, category: 'Apparel' },
  { id: 18, name: 'Headphones', price: 100, category: 'Electronics' },
  { id: 19, name: 'Phone Case', price: 10, category: 'Electronics' },
  { id: 20, name: 'Desk', price: 180, category: 'Furniture' },
  // Add more items as needed...
];

export default function PG() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  let options = new Set();
  options.add('All');
  items.map((i) => options.add(i.category));
  // In JSX

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const filteredItems = currentItems.filter(
    (item) => filter === 'All' || item.category === filter
  );
  const searchedItems = search
    ? filteredItems.filter((item) => item.name.includes(search))
    : filteredItems;

  const [sortOrder, setSortOrder] = useState('');

  const sortedItems = searchedItems.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return searchedItems;
  });
  return (
    <div className='min-h-screen bg-gray-100 p-2'>
      {' '}
      <h1>PG</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {Array.from(options).map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search items...'
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value=''>Default</option>
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </select>
      <div>
        {sortedItems.map((item) => (
          <div key={item.id}>
            {item.name} {/* Adjust based on your item's structure */}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
