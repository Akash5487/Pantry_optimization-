const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'pantry-server',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const runProducer = async (message) => {
  await producer.connect();
  await producer.send({
    topic: 'pantry-notifications',
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

module.exports = { runProducer };