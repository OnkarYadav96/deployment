import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Express backend
    fetch('http://localhost:5000/api/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
        setError('Failed to load items.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading items...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Items List</h1>
      
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {items.map((item) => (
            <li 
              key={item.id} 
              style={{ 
                padding: '10px', 
                margin: '5px 0', 
                backgroundColor: '#f4f4f4', 
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <strong>ID:</strong> {item.id} — <strong>Name:</strong> {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
