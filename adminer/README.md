 # Adminer
Imagem DockerHub:
https://hub.docker.com/_/adminer

 # O que é?
 - O Adminer é uma ferramenta web usada para acessar e gerenciar bancos de dados SQL, como MySQL, PostgreSQL, entre outros. É parecido com o phpMyAdmin, mas é mais leve e fácil de rodar com Docker.

 # Para que serve?
 - Com o Adminer, dá pra:
 - Visualizar e editar tabelas
 - Inserir, deletar e atualizar dados
 - Fazer consultas SQL
 - Criar ou remover bancos e campos

# Como usar
 - Crie um arquivo docker-compose.yml com:

yaml
Copiar
Editar
version: '3'

services:
  adminer:
    image: adminer
    ports:
      - 8080:8080
 - No terminal, execute:

bash
Copiar
Editar
docker-compose up
Acesse no navegador:
http://localhost:8080

