import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;

// Hash compativel com passlib pbkdf2_sha256
function hashPassword(password) {
    const saltBytes = crypto.randomBytes(16);
    const salt = saltBytes.toString('base64url');
    const iterations = 600000;
    const keylen = 32;
    const hashBytes = crypto.pbkdf2Sync(password, saltBytes, iterations, keylen, 'sha256');
    const hash = hashBytes.toString('base64url');
    return `$pbkdf2-sha256$i=${iterations},l=${keylen}$${salt}$${hash}`;
}

const DATABASE_URL = 'postgresql://postgres:USWVMOOGZXpocoBbNvRRKzxnjzumBNCw@shortline.proxy.rlwy.net:44238/railway';
const EMAIL = 'admin@sistema.com';
const SENHA = 'admin123';
const NOME = 'Administrador';

const client = new Client({ connectionString: DATABASE_URL });

try {
    await client.connect();
    console.log('Conectado ao banco Railway...');

    const hashed = hashPassword(SENHA);

    const existing = await client.query('SELECT id, email, role FROM users WHERE email = $1', [EMAIL]);

    if (existing.rows.length > 0) {
        await client.query(
            'UPDATE users SET role = $1, senha = $2, ativo = $3 WHERE email = $4',
            ['ADMIN', hashed, true, EMAIL]
        );
        console.log('Usuario existente atualizado para ADMIN: ' + EMAIL);
    } else {
        const result = await client.query(
            'INSERT INTO users (nome, email, senha, role, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [NOME, EMAIL, hashed, 'ADMIN', true]
        );
        console.log('Usuario administrador criado com sucesso!');
        console.log('ID: ' + result.rows[0].id);
    }

    console.log('');
    console.log('Email: ' + EMAIL);
    console.log('Senha: ' + SENHA);
    console.log('Role: ADMIN');
    console.log('');
    console.log('Pronto! Faca login no sistema com as credenciais acima.');

} catch (err) {
    console.error('ERRO:', err.message);
} finally {
    await client.end();
}
