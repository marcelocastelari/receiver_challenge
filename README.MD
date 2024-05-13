# Receivers Challenge

## Objetivo

A finalidade desse projeto é cadastrar e manipular listas de 'recebedores', com dados como nome, cpf/cnpj, chave pix etc.

## Pré Requisitos

![Node](https://img.shields.io/badge/Node-19.7.0-brightgreen)

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


## Setup do Projeto

``` 
npm install
# OR
yarn install
```

## Envs

O projeto por padrão se não encontrar um arquivo .env irá rodar na Porta **8000**.

Rodando localmente o endereço será:

```http
localhost:8000/
```

Para configurar a porta, basta criar o arquivo .env na raiz do projeto e configurá-lo com as envs necessárias. No projeto existe o arquivo .***env.example*** para exemplificar como inserir as Envs necessárias.

## Compilar para desenvolvimento
```
npm start
```

## Rodar ou parar banco de dados
```
docker compose up 
docker compose down
```

## Rodar testes
```
npm test
```


## Documentação da API

### Retorna todos os recebedores cadastrados
```http
  GET /receiver
```

#### Faz a busca personalizada, pode se buscar pelos campos: ['status', 'nome", "pixKeyType" ou "pixKey" ] 

```http
  GET /receiver/:id
```

#### Cadastra um novo recebedor

```http
  POST /receiver
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `pix_key`      | `string` | **Obrigatório**.  |
| `pix_key_type`      | `string` | **Obrigatório**. Aceita apenas os valores: 'CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'   |
| `cpf_cnpj`      | `string` | **Obrigatório**.  |
| `email`      | `string` | **Obrigatório**. Precisa ter o formato válido de e-mail. |
| `name`      | `string` | **Obrigatório**.  |


#### Atualiza os dados do recebedor
```http
  PUT /receiver/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `pix_key`      | `string` | **Obrigatório**.  |
| `pix_key_type`      | `string` | **Obrigatório**. Aceita apenas os valores: 'CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'   |
| `cpf_cnpj`      | `string` | **Obrigatório**.  |
| `email`      | `string` | **Obrigatório**. Precisa ter o formato válido de e-mail. |
| `name`      | `string` | **Obrigatório**.  |


#### Deleta um recebedor 

```http
  DELETE /receiver/:id
```

#### Deleta vários recebedores
```http
  POST /receiver/bulk-delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ids`      | `array` | **Obrigatório**. Array com os ID's para delete massivo.  |