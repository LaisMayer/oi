# Sistema Web com Frontend, Backend e Banco de Dados (Docker Compose)

Este projeto simula um ambiente web completo com três serviços:

- Frontend: HTML, CSS e javascript
- Backend: Python e Flask
- Banco de dados: MySQL

Todos os serviços são executados e orquestrados com Docker Compose, usando redes, volumes e variáveis de ambiente.

## Ferramentas

- Docker
- Docker Compose
- Python 3.10
- Flask
- MySQL 5.7
- HTML e CSS

## Como rodar o projeto

1. Copie o arquivo `.env.template` para `.env`:

```bash
cp .env.template .env
```

2. Rode o Docker Compose:

```bash
docker-compose up --build
```

3. Acesse os serviços no navegador:

- Frontend: http://localhost:8080  
- Backend: http://localhost:5000

## Arquitetura

- O frontend é um site estático, servido por um servidor Python simples.
- O backend é uma API em Flask que futuramente pode se conectar ao MySQL.
- O banco de dados MySQL é configurado via variáveis e persiste dados com volume.

Todos os serviços estão conectados por uma rede Docker chamada `minha-rede`.

## Variáveis de Ambiente

O arquivo `.env.template` armazena as configurações do banco:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=meubanco
MYSQL_USER=usuario
MYSQL_PASSWORD=senha123
```

Essas variáveis são usadas automaticamente pelo `docker-compose.yml` para configurar o MySQL e o backend.

## Diagrama da Arquitetura (Mermaid)

```mermaid
graph LR
  A[Frontend - HTML/CSS] -->|requisição| B[Backend - Flask]
  B -->|conexão| C[MySQL]
```