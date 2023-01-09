const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/carrinho.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const CarrinhoService = grpc.loadPackageDefinition(packageDefinition).CarrinhoService;
const client = new CarrinhoService('127.0.0.1:3003', grpc.credentials.createInsecure());

module.exports = client;


