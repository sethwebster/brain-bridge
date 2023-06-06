import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const address = process.env.MILVUS_URL;
const username = 'root'; // optional username
const password = 'Milvus'; // optional password
const ssl = false; // secure or not

// connect to milvus
const client = new MilvusClient({ address, ssl, username, password });

export default client as MilvusClient;
