# RF

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder  listar todas as transações que já ocorreram
- [x] O usuario deve poder visualizar uma transação única

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou debito que vai subtrair;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuario só pode visualizar transações o qual ele criou;

# RNF

- Sem nenhuma implementação por agora

# Recursos

docker run -d --name Postgres -p 5432:5432 -e POSTGRES_PASSWORD=!qaz2wsx -e POSTGRES_USER=Mariogomes -e POSTGRES_DB=apirestnodejs postgres

npx prisma migrate dev --name Edittetransaction init
