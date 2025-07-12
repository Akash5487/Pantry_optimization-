import React, { useState } from 'react';

function ItemList({ items, addItem, updateItem, deleteItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateItem(editId, editName, editQuantity);
      setEditId(null);
      setEditName('');
      setEditQuantity('');
    } else {
      addItem(name, quantity);
      setName('');
      setQuantity('');
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editId ? editName : name}
          onChange={(e) => (editId ? setEditName(e.target.value) : setName(e.target.value))}
          placeholder="Item name"
          required
        />
        <input
          type="number"
          value={editId ? editQuantity : quantity}
          onChange={(e) => (editId ? setEditQuantity(e.target.value) : setQuantity(e.target.value))}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <span>{item.name} (Quantity: {item.quantity})</span>
            <div>
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;