const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'pantry-server',
  brokers: ['kafka:9092']
});

const runConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'pantry-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'pantry-notifications', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`Received: ${message.value.toString()}`);
    },
  });
};

module.exports = { runConsumer };