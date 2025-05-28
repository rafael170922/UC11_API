// Importa o mongoose para conectar ao MongoDB
const mongoose = require('mongoose');

// Importa para criar um servidor em Memória
const { MongoMemoryServer} = require('mongodb-memory-server');

// Variavél que irá armazenar o servidor em memória(Instância)
let mongoServer;

// Configuração global
beforeAll(async () => {
    // Desconectar qualquer conexão
    await mongoose.disconnect();

    // Criando a instância do MongoDB na Memória
    mongoServer = await MongoMemoryServer.create()
    
    // Obter a URI de conexão do servidor criado.
    const mongoUri = mongoServer.getUri();

    // configurar opções de conexão
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Conecta o Mongoose ao banco de dados em memória
    await mongoose.connect(mongoUri, mongooseOpts);
});

// Limpeza após cada teste.
afterEach(async () => {
    // Acessa todas as coleções existentes no DB
    const collections = mongoose.connection.collections;
    // Para cada coleção encontrada
    for (const key in collections) {
        const collection = collections[key];
        // Remove todos os documentos da coleção.
        await collection.deleteMany({});
    }
});

// limpeza após todos os testes
afterAll(async () => {
    // Encerra a conexão do mongoose com o DB
    await mongoose.disconnect();
    // Para o servidor MongoDB em memória (Libera Recurso)
    await mongoServer.stop();
});