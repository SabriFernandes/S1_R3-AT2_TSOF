//lembrar do mock
import app from './src/app.js'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'


// LOGIN

describe('API de login', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-001
    it('deve fazer login com dados corretos', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@automoveis.com',
                senha: '987654'
            })

        expect(response.status).toBe(200)
    })

    // CT-002
    it('não deve fazer login com senha incorreta', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@automoveis.com',
                senha: '111111'
            })

        expect(response.status).toBe(401)
    })

    // CT-003
    it('não deve fazer login com e-mail inexistente', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: 'naoexiste@automoveis.com',
                senha: '987654'
            })

        expect(response.status).toBe(401)
    })

    // CT-004
    it('não deve fazer login com campos vazios', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: '',
                senha: ''
            })

        expect(response.status).toBe(400)
    })

    // CT-005
    it('deve solicitar recuperação de senha', async () => {

        const response = await request(app)
            .post('/recuperar-senha')
            .send({
                email: 'admin@automoveis.com'
            })

        expect(response.status).toBe(200)
    })

})


// USUÁRIOS

describe('API de usuários', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-006
    it('deve cadastrar um usuário', async () => {

        const response = await request(app)
            .post('/usuarios')
            .send({
                nome: 'Carlos Oliveira',
                email: 'carlos@automoveis.com',
                tipo_usuario: 'geral',
                senha: '456789'
            })

        expect(response.status).toBe(201)
    })

    // CT-007
    it('não deve cadastrar usuário com e-mail existente', async () => {

        await request(app)
            .post('/usuarios')
            .send({
                nome: 'Carlos Oliveira',
                email: 'carlos@automoveis.com',
                tipo_usuario: 'geral',
                senha: '456789'
            })

        const response = await request(app)
            .post('/usuarios')
            .send({
                nome: 'Ana Souza',
                email: 'carlos@automoveis.com',
                tipo_usuario: 'geral',
                senha: '123789'
            })

        expect(response.status).toBe(400)
    })

    // CT-008
    it('não deve cadastrar usuário sem os campos obrigatórios', async () => {

        const response = await request(app)
            .post('/usuarios')
            .send({
                nome: '',
                email: '',
                senha: ''
            })

        expect(response.status).toBe(400)
    })

})


// PATRIMÔNIOS

describe('API de patrimônios', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-009
    it('deve cadastrar um patrimônio', async () => {

        const response = await request(app)
            .post('/patrimonios')
            .send({
                descricao: 'Notebook Lenovo',
                numero_identificacao: 'PAT100',
                id_sala: 2,
                status: 'disponivel'
            })

        expect(response.status).toBe(201)
    })

    // CT-010
    it('deve editar um patrimônio', async () => {

        const response = await request(app)
            .put('/patrimonios/1')
            .send({
                descricao: 'Notebook Lenovo atualizado',
                id_sala: 3,
                status: 'manutencao'
            })

        expect(response.status).toBe(200)
    })

    // CT-011
    it('deve listar patrimônios por sala', async () => {

        const response = await request(app)
            .get('/patrimonios')
            .query({
                id_sala: 2
            })

        expect(response.status).toBe(200)
    })

    // CT-012
    it('deve excluir um patrimônio', async () => {

        const response = await request(app)
            .delete('/patrimonios/1')

        expect(response.status).toBe(200)
    })

})


// ORDENS DE SERVIÇO

describe('API de ordens de serviço', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-013
    it('deve criar uma solicitação de manutenção', async () => {

        const response = await request(app)
            .post('/ordens-servico')
            .send({
                id_patrimonio: 1,
                descricao: 'Notebook não está ligando'
            })

        expect(response.status).toBe(201)
    })

    // CT-014
    it('deve anexar uma imagem', async () => {

        const response = await request(app)
            .post('/ordens-servico/1/imagem')
            .attach(
                'imagem',
                Buffer.from('imagem de teste'),
                'problema.png'
            )

        expect(response.status).toBe(200)
    })

    // CT-015
    it('deve alterar o status da ordem de serviço', async () => {

        const response = await request(app)
            .put('/ordens-servico/1')
            .send({
                status: 'em_andamento'
            })

        expect(response.status).toBe(200)
    })

    // CT-016
    it('deve definir a prioridade da ordem de serviço', async () => {

        const response = await request(app)
            .put('/ordens-servico/1')
            .send({
                prioridade: 'alta'
            })

        expect(response.status).toBe(200)
    })

    // CT-017
    it('deve cancelar uma solicitação', async () => {

        const response = await request(app)
            .put('/ordens-servico/1')
            .send({
                status: 'cancelada'
            })

        expect(response.status).toBe(200)
    })

})


// RELATÓRIOS

describe('API de relatórios', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-018
    it('deve gerar relatório de ordens de serviço em PDF', async () => {

        const response = await request(app)
            .get('/relatorios/ordens-servico/pdf')

        expect(response.status).toBe(200)
    })

    // CT-019
    it('deve gerar relatório de patrimônio em XLSX', async () => {

        const response = await request(app)
            .get('/relatorios/patrimonio/xlsx')

        expect(response.status).toBe(200)
    })

    // CT-020
    it('deve filtrar o painel por status', async () => {

        const response = await request(app)
            .get('/relatorios/estatisticas')
            .query({
                status: 'concluida'
            })

        expect(response.status).toBe(200)
    })

})