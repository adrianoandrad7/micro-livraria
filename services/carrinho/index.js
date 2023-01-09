const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const itens = require('./carrinho.json');

const packageDefinition = protoLoader.loadSync('proto/carrinho.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const carrinhoProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do InventoryService
server.addService(carrinhoProto.CarrinhoService.service, {
    GetCarrinho: (_, callback) => {
        callback(null, {
            products: itens,
        });
    }
});

server.bindAsync('127.0.0.1:3003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Carrinho Service running at http://127.0.0.1:3003');
    server.start();
});
