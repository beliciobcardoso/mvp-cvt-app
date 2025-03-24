/**
 * Interface que representa um feriado
 */
export interface Feriado {
    dia: number;
    mes: number;
    nome: string;
    tipo: 'nacional' | 'estadual' | 'municipal' | 'facultativo';
}

/**
 * Lista de feriados nacionais com data fixa
 */
export const feriadosNacionaisFixos: Feriado[] = [
    { dia: 1, mes: 1, nome: "Confraternização Universal", tipo: "nacional" },
    { dia: 21, mes: 4, nome: "Tiradentes", tipo: "nacional" },
    { dia: 1, mes: 5, nome: "Dia do Trabalho", tipo: "nacional" },
    { dia: 7, mes: 9, nome: "Independência do Brasil", tipo: "nacional" },
    { dia: 12, mes: 10, nome: "Nossa Senhora Aparecida", tipo: "nacional" },
    { dia: 2, mes: 11, nome: "Finados", tipo: "nacional" },
    { dia: 15, mes: 11, nome: "Proclamação da República", tipo: "nacional" },
    { dia: 20, mes: 11, nome: "Dia Nacional de Zumbi e da Consciência Negra", tipo: "nacional" },
    { dia: 25, mes: 12, nome: "Natal", tipo: "nacional" },
    // Feriados facultativos
    { dia: 8, mes: 3, nome: "Dia Internacional da Mulher", tipo: "facultativo" },
    { dia: 12, mes: 6, nome: "Dia dos Namorados", tipo: "facultativo" },
    { dia: 9, mes: 8, nome: "Dia dos Pais", tipo: "facultativo" },
];

/**
 * Verifica se uma data específica é um feriado nacional fixo
 * @param dia - O dia do mês
 * @param mes - O mês (1-12)
 * @param tipos - Tipos de feriados a serem considerados
 * @returns O feriado encontrado ou null se não for feriado
 */
export function verificarFeriado(
    dia: number,
    mes: number,
    tipos: ('nacional' | 'estadual' | 'municipal' | 'facultativo')[] = ['nacional']
): Feriado | null {
    return feriadosNacionaisFixos.find(
        feriado => feriado.dia === dia &&
            feriado.mes === mes &&
            tipos.includes(feriado.tipo)
    ) || null;
}

/**
 * Obtém todos os feriados de um mês específico
 * @param mes - O mês (1-12)
 * @param tipos - Tipos de feriados a serem considerados
 * @returns Lista de feriados no mês
 */
export function getFeriadosDoMes(
    mes: number,
    tipos: ('nacional' | 'estadual' | 'municipal' | 'facultativo')[] = ['nacional']
): Feriado[] {
    return feriadosNacionaisFixos.filter(
        feriado => feriado.mes === mes && tipos.includes(feriado.tipo)
    );
}

/**
 * Calcula a data da Páscoa para um determinado ano
 * Algoritmo de Butcher
 * @param ano - O ano para calcular a Páscoa
 * @returns Objeto Date representando o domingo de Páscoa
 */
export function calcularPascoa(ano: number): Date {
    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(ano, mes - 1, dia);
}

/**
 * Obtém os feriados móveis baseados na data da Páscoa para um ano específico
 * @param ano - O ano para calcular os feriados móveis
 * @returns Lista de feriados móveis
 */
export function getFeriadosMoveis(ano: number): Feriado[] {
    const pascoa = calcularPascoa(ano);
    const carnavalTerca = new Date(pascoa);
    carnavalTerca.setDate(pascoa.getDate() - 47);

    const carnavalSegunda = new Date(carnavalTerca);
    carnavalSegunda.setDate(carnavalTerca.getDate() - 1);

    const sextaSanta = new Date(pascoa);
    sextaSanta.setDate(pascoa.getDate() - 2);

    const corpusChristi = new Date(pascoa);
    corpusChristi.setDate(pascoa.getDate() + 60);

    return [
        {
            dia: carnavalSegunda.getDate(),
            mes: carnavalSegunda.getMonth() + 1,
            nome: "Segunda-feira de Carnaval",
            tipo: "facultativo"
        },
        {
            dia: carnavalTerca.getDate(),
            mes: carnavalTerca.getMonth() + 1,
            nome: "Terça-feira de Carnaval",
            tipo: "facultativo"
        },
        {
            dia: sextaSanta.getDate(),
            mes: sextaSanta.getMonth() + 1,
            nome: "Sexta-feira Santa",
            tipo: "nacional"
        },
        {
            dia: pascoa.getDate(),
            mes: pascoa.getMonth() + 1,
            nome: "Páscoa",
            tipo: "nacional"
        },
        {
            dia: corpusChristi.getDate(),
            mes: corpusChristi.getMonth() + 1,
            nome: "Corpus Christi",
            tipo: "facultativo"
        }
    ];
}

/**
 * Obtém todos os feriados para um ano específico (fixos e móveis)
 * @param ano - O ano para obter os feriados
 * @param tipos - Tipos de feriados a serem incluídos
 * @returns Lista completa de feriados para o ano
 */
export function getTodosFeriados(
    ano: number,
    tipos: ('nacional' | 'estadual' | 'municipal' | 'facultativo')[] = ['nacional']
): Feriado[] {
    // Combina feriados fixos com móveis
    const feriadosMoveis = getFeriadosMoveis(ano).filter(f => tipos.includes(f.tipo));
    return [...feriadosNacionaisFixos.filter(f => tipos.includes(f.tipo)), ...feriadosMoveis];
}