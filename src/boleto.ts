// src/boleto.ts
import axios from 'axios';

interface BoletoData {
  CedenteContaNumero: string;
  CedenteContaNumeroDV: string;
  CedenteConvenioNumero: string;
  CedenteContaCodigoBanco: string;
  TituloCarteira: string;
  SacadoCPFCNPJ: string;
  SacadoEmail: string;
  SacadoEnderecoNumero: string;
  SacadoEnderecoBairro: string;
  SacadoEnderecoCEP: string;
  SacadoEnderecoCidade: string;
  SacadoEnderecoComplemento: string;
  SacadoEnderecoLogradouro: string;
  SacadoEnderecoPais: string;
  SacadoEnderecoUF: string;
  SacadoNome: string;
  SacadoTelefone: string;
  SacadoCelular: string;
  TituloDataEmissao: string;
  TituloDataVencimento: string;
  TituloMensagem01: string;
  TituloMensagem02: string;
  TituloMensagem03: string;
  TituloNossoNumero: string;
  TituloNumeroDocumento: string;
  TituloValor: string;
  TituloLocalPagamento: string;
}

export async function enviarBoleto(boletoData: BoletoData): Promise<{ data: any; responseTime: number; statusHttp: number }> {
  try {
    const startTime = performance.now(); // Início da contagem do tempo
    const response = await axios.post(
      'https://homologacao.plugboleto.com.br/api/v1/boletos/lote',
      [boletoData], // Enviando como um array
      {
        headers: {
          'Content-Type': 'application/json',
          'cnpj-sh': '12067625000150',
          'token-sh': 'a60c428fbfcafa73bc8eda5e9b7fee4e',
          'cnpj-cedente': '78839345000120',
        },
      }
    );
    const endTime = performance.now(); // Fim da contagem do tempo
    const duration = endTime - startTime; // Duração em milissegundos
    console.log(`A requisição levou ${duration.toFixed(2)} ms.`); // Exibe o tempo da requisição
    return { data: response.data, responseTime: duration, statusHttp: response.status }; // Retorna dados, tempo de resposta e status HTTP
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao enviar o boleto:', error.response?.data || error.message);
      throw error; // Lança o erro para tratamento posterior
    } else {
      console.error('Erro desconhecido:', error);
      throw error; // Lança o erro para tratamento posterior
    }
  }
}
