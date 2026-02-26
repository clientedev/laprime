const { Client } = require('pg');
const crypto = require('crypto');

// pbkdf2_sha256 hash compativel com passlib
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const iterations = 600000;
    const keylen = 32;
    const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha256').toString('base64');
    return `$pbkdf2-sha256$i=${iterations},l=${keylen}$${salt}$${hash}`;
}

const DATABASE_URL = 'postgresql://postgres:USWVMOOGZXpocoBbNvRRKzxnjzumBNCw@shortline.proxy.rlwy.net:44238/railway';
const EMAIL = 'admin@sistema.com';
const SENHA = 'admin123';
const NOME = 'Administrador';

async function createAdmin() {
    const client = new Client({ connectionString: DATABASE_URL });

    try {
        await client.connect();
        console.log('Conectado ao banco Railway...');

        const hashed = hashPassword(SENHA);

        // Verificar se usuario ja existe
        const existing = await client.query('SELECT id, email, role FROM users WHERE email = $1', [EMAIL]);

        if (existing.rows.length > 0) {
            await client.query(
                'UPDATE users SET role = $1, senha = $2 WHERE email = $3',
                ['ADMIN', hashed, EMAIL]
            );
            console.log('✅ Usuario existente atualizado para ADMIN: ' + EMAIL);
        } else {
            const result = await client.query(
                'INSERT INTO users (nome, email, senha, role, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [NOME, EMAIL, hashed, 'ADMIN', true]
            );
            console.log('✅ Usuario administrador criado!');
            console.log('   ID: ' + result.rows[0].id);
            console.log('   Email: ' + EMAIL);
            console.log('   Senha: ' + SENHA);
            console.log('   Role: ADMIN');
        }
    } catch (err) {
        console.error('Erro:', err.message);
        throw err;
    } finally {
        await client.end();
    }
}

createAdmin().catch(console.error);
