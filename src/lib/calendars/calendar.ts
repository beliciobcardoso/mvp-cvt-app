const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

/**
 * Gera um calendário para o mês e ano específicos
 * @param month - Índice do mês (0-11)
 * @param year - Ano completo (ex: 2025)
 * @returns Uma matriz onde cada linha é uma semana e cada coluna é um dia
 */
function generateCalendar(month: number, year: number): (number | null)[][] {
  // Determina o primeiro dia do mês (0-6, onde 0 é domingo)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Determina quantos dias tem o mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Cria uma matriz para o calendário (máximo 6 semanas)
  const calendar: (number | null)[][] = [];
  
  // Preenche o calendário
  let dayCounter = 1;
  let weekCounter = 0;
  
  // Pode ter até 6 semanas em um mês
  for (let week = 0; week < 6; week++) {
    // Inicializa a semana
    calendar[week] = [];
    
    // Preenche cada dia da semana (0-6)
    for (let day = 0; day < 7; day++) {
      // Dias antes do início do mês
      if (week === 0 && day < firstDayOfMonth) {
        calendar[week][day] = null;
      }
      // Dias depois do fim do mês
      else if (dayCounter > daysInMonth) {
        calendar[week][day] = null;
      }
      // Dias do mês
      else {
        calendar[week][day] = dayCounter;
        dayCounter++;
      }
    }
    
    // Se terminou de preencher os dias e a próxima semana estaria vazia, para
    if (dayCounter > daysInMonth && week < 5) {
      // Verifica se a próxima semana estaria vazia
      if (calendar[week].some(day => day !== null)) {
        weekCounter = week;
      } else {
        break;
      }
    }
  }
  
  // Remove semanas vazias no final (todas com null)
  while (calendar.length > 0 && calendar[calendar.length - 1].every(day => day === null)) {
    calendar.pop();
  }
  
  return calendar;
}

/**
 * Formata o calendário como uma string para exibição no console
 */
function printCalendar(month: number, year: number): void {
  const calendar = generateCalendar(month, year);
  
  console.log(`\nCalendário de ${months[month]} de ${year}`);
  console.log("---------------------------");
  
  // Imprime os dias da semana
  console.log(weekdays.map(day => day.substring(0, 3)).join(" "));
  
  // Imprime as semanas
  calendar.forEach(week => {
    const formattedWeek = week.map(day => {
      if (day === null) {
        return "   "; // Espaço em branco para dias fora do mês
      } else {
        return day.toString().padStart(3, " "); // Alinha os dias
      }
    });
    console.log(formattedWeek.join(" "));
  });
}

// Exemplo de uso - crie um calendário para o mês atual
// const currentMonth = new Date().getMonth();
// const currentYear = new Date().getFullYear();

// Para testar com o mês que você já estava usando (índice 3 = abril)
// const mes = 3;
// printCalendar(mes, currentYear);

// Para testar com o mês atual
// printCalendar(currentMonth, currentYear);

export { generateCalendar, printCalendar, months, weekdays };
export type { CalendarType };
type CalendarType = {
  month: number;
  year: number;
  daysInMonth: number;
  firstDayOfMonth: number;
  calendar: (number | null)[][];
};