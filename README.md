**Pantry Optimization**
A full-stack pantry management application with real-time notifications, built with React JS, Node.js, MongoDB, Kafka, Kubernetes, and CI/CD.

**Features**
Add, update, and delete pantry items
Real-time low stock notifications via Kafka
Scalable deployment with Docker and Kubernetes
Automated CI/CD with GitHub Actions
MongoDB for persistent storage

**Prerequisites**
Node.js 18.x
MongoDB (local or Atlas)
Apache Kafka with Zookeeper
Docker
Minikube

**Clone the repository:**
git clone https://github.com/yourusername/PantryOptimization.git

**Install client dependencies:**

cd client
npm install

**Install server dependencies:**

cd server
npm install



**Start MongoDB:**

docker run -d -p 27017:27017 --name mongo mongo



**Start Kafka and Zookeeper:**

docker run -d -p 2181:2181 --name zookeeper zookeeper
docker run -d -p 9092:9092 --name kafka \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka
docker exec kafka kafka-topics --create --topic pantry-notifications --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1



**Start the server:**

cd server
npm start



**Start the client:**

cd client
npm start



**For Kubernetes deployment:**

minikube start
kubectl apply -f k8s/
minikube service pantry-client

**CI/CD**
GitHub Actions automates testing and deployment to Kubernetes on push to main.
