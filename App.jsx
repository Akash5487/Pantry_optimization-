import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import Notification from './components/Notification';
import { Kafka } from 'kafkajs';
import './index.css';

const kafka = new Kafka({
  clientId: 'pantry-client',
  brokers: ['localhost:9092']
});

function App() {
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState('');

  // Fetch pantry items
  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  // Kafka consumer for real-time notifications
  useEffect(() => {
    const consumer = kafka.consumer({ groupId: 'pantry-group' });
    const runConsumer = async () => {
      await consumer.connect();
      await consumer.subscribe({ topic: 'pantry-notifications', fromBeginning: true });
      await consumer.run({
        eachMessage: async ({ message }) => {
          setNotification(message.value.toString());
        },
      });
    };
    runConsumer().catch(console.error);
    return () => consumer.disconnect();
  }, []);

  // Add new item
  const addItem = async (name, quantity) => {
    try {
      const response = await axios.post('http://localhost:5000/api/items', { name, quantity });
      setItems([...items, response.data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Update item
  const updateItem = async (id, name, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/items/${id}`, { name, quantity });
      setItems(items.map(item => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container">
      <h1>Pantry Optimization</h1>
      <Notification message={notification} />
      <ItemList items={items} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
    </div>
  );
}

export default App;