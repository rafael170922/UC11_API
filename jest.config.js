module.exports = {
    testEnvironment: 'node', // Define o ambiente (teste) como Node
    testMatch: ['**/__tests__/**/*.test.js'], // Arquivos do Jest para executar, terminam com .test.js
    
    // Define quais arquivosdevem aparecer no relatório.
    collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!**/coverage/**'
    ],
    // Define os arquivos de configuração que será executado.
    setupFilesAfterEnv: ['./__tests__/setup.js']
}