INSERT INTO produto (descricao, valor, marca)
 VALUES('Arroz parboilizado 5Kg', 25, 'Tio João');
INSERT INTO produto (descricao, valor, marca)
 VALUES('Maionese 250gr', 7.2, 'Helmanns');
INSERT INTO produto (descricao, valor, marca)
 VALUES('Iogurte Natural 200ml', 2.5, 'Itambé');
INSERT INTO produto (descricao, valor, marca)
 VALUES('Nescau 400gr', 8, 'Nestlé');
INSERT INTO produto (descricao, valor, marca)
 VALUES('Batata Palha 180gr', 5.20, 'Chipps');
INSERT INTO produto (descricao, valor, marca)
 VALUES('Feijão Carioquinha', 5, 'Xap');


 INSERT INTO usuario (nome, login, senha, email, roles)
 VALUES('user', 'user',
'$2a$08$cgWo0k133AqN7bfHTkKK8eedZRBlpZL08piXXQP521KOFXIF4sWha',
'user@abc.com.br', 'USER');
INSERT INTO usuario (nome, login, senha, email, roles)
 VALUES('admin', 'admin',
'$2a$08$cgWo0k133AqN7bfHTkKK8eedZRBlpZL08piXXQP521KOFXIF4sWha',
'admini@abc.com.br', 'USER;ADMIN');