// src/index.ts
import sequelize from './database';
import { enviarBoleto } from './boleto';
import ResponseLog from './models/ResponseLog'; // Importa o modelo

async function main() {
  try {
    // Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida.');

    // Dados do boleto
    const boletoData = {
      CedenteContaNumero: '123456',
      CedenteContaNumeroDV: '7',
      CedenteConvenioNumero: '12345678',
      CedenteContaCodigoBanco: '001',
      TituloCarteira: '17',
      SacadoCPFCNPJ: '06946389000',
      SacadoEmail: 'emaildosacado@sacado.com',
      SacadoEnderecoNumero: '390',
      SacadoEnderecoBairro: 'zone 20',
      SacadoEnderecoCEP: '87098765',
      SacadoEnderecoCidade: 'Maringá',
      SacadoEnderecoComplemento: 'Fundos',
      SacadoEnderecoLogradouro: 'Rua teste, 987',
      SacadoEnderecoPais: 'Brasil',
      SacadoEnderecoUF: 'PR',
      SacadoNome: 'Teste da Silva',
      SacadoTelefone: '4499999999',
      SacadoCelular: '44999999999',
      TituloDataEmissao: '2024-03-01',
      TituloDataVencimento: '2024-05-01',
      TituloMensagem01: 'Juros de 0,02 ao dia',
      TituloMensagem02: 'Não receber após 30 dias de atraso',
      TituloMensagem03: 'Título sujeito a protesto após 30 dias',
      TituloNossoNumero: '7',
      TituloNumeroDocumento: '01012023',
      TituloValor: '0,02',
      TituloLocalPagamento: 'Pagável em qualquer banco até o vencimento.',
    };

    // Envia o boleto e recebe a resposta da API
    const resultado = await enviarBoleto(boletoData);
    console.log('Resposta da API:', JSON.stringify(resultado.data, null, 2)); // Exibe a resposta da API

    // Scraping para obter o _status_http
    const statusHttp = resultado.data._dados._falha.length > 0 
      ? resultado.data._dados._falha[0]._status_http 
      : resultado.statusHttp; // Usa o statusHttp retornado pela função

    // Determina o valor de monitoramento
    let monitoramento = "negativo"; // Default é negativo
    const positiveStatuses = [200, 400, 401, 403, 422];
    const negativeStatuses = ['ECONNRESET', 'EHOSTUNREACH', 500, 504];

    if (positiveStatuses.includes(statusHttp)) {
      monitoramento = "positivo";
    } else if (negativeStatuses.includes(statusHttp)) {
      monitoramento = "negativo";
    }

    // Salva o tempo de resposta, o status HTTP e o monitoramento no banco de dados
    await ResponseLog.create({
      responseTime: resultado.responseTime,
      statusHttp: statusHttp,
      monitoramento: monitoramento, // Salva o valor de monitoramento
    });
    console.log('Dados salvos no banco de dados com sucesso.');

  } catch (error) {
    console.error('Erro na aplicação:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
  }
}

main();
