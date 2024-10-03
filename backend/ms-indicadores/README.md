# Projeto NodeJS Indicator MySQL

## Dependências

Este projeto utiliza as seguintes dependências:

- **express**: Framework web para Node.js.
- **mysql2**: Cliente MySQL para Node.js.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.

Para instalar todas as dependências, execute:

```sh
    npm install
```


## Instalação

Siga os passos abaixo para configurar e instalar as dependências do projeto:

1. **Configuração do Banco de Dados:**
    Crie um banco de dados MySQL e configure as credenciais no arquivo `.env`:
    ```env
    DB_HOST=localhost
    DB_USER=seu-usuario
    DB_PASSWORD=sua-senha
    DB_NAME=nome-do-banco
    ```

2. **Inicie a aplicação:**
```sh
    npm run start
```

## Uso

Após iniciar a aplicação, ela estará disponível em `http://localhost:3000`.
