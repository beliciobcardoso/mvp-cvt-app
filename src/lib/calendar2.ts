const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const month = new Date().getMonth();
const weekday = new Date().getDay();
const day = new Date().getDate();
const year = new Date().getFullYear();
const date = new Date(year, month, day);
const dateString = date.toLocaleDateString("pt-BR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const dateString2 = date.toLocaleDateString("pt-BR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
});

// console.log(weekday)
// console.log(month)
console.log("-----------------");

const mes = 3


// console.log(month, "=", months[month]);
console.log(mes + 1, "=", months[mes]);
console.log(weekday, "=" ,weekdays[weekday]);
console.log("-----------------");

const daysInMonth = new Date(year, mes + 1, 0).getDate();
console.log("O mês",months[mes],"Tem:",daysInMonth, "dias");
console.log("O mês",months[mes],"Começa em:", new Date(year, mes, 1).getDay(), "que é um", weekdays[new Date(year, mes, 1).getDay()]);
console.log("O mês",months[mes],"Termina em:", new Date(year, mes + 1, 0).getDay(), "que é um", weekdays[new Date(year, mes + 1, 0).getDay()]);
console.log("-----------------");

const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
console.log(daysArray);
console.log("-----------------");


// console.log(dateString);
// console.log(dateString2);

// console.log("-----------------");

// console.log(day);
// console.log(year);

// console.log("-----------------");

// console.log(date);
// console.log("-----------------");
// console.log(date.getDate());
// console.log(date.getDay());
// console.log(date.getMonth());
// console.log(date.getFullYear());

// console.log("-----------------");

// console.log(date.getUTCDate());
// // console.log(date.getUTCDay());
// console.log(date.getUTCMonth());
// console.log(date.getUTCFullYear());

// console.log("-----------------");

