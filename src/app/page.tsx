'use client';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { generateCalendar, months, weekdays } from "@/lib/calendars/calendar"
import { useState, useMemo, useCallback } from "react";
import { verificarFeriado, getTodosFeriados } from '@/lib/calendars/feriados';

export default function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Memorização do calendário para evitar recálculos desnecessários
  const calendar = useMemo(() => {
    return generateCalendar(month, year);
  }, [month, year]);

  // Memoriza todos os feriados do ano atual
  const feriados = useMemo(() => {
    // Obter todos os feriados nacionais e facultativos
    return getTodosFeriados(year, ['nacional', 'facultativo']);
  }, [year]);

  // Filtra feriados apenas do mês atual
  const feriadosDoMesAtual = useMemo(() => {
    return feriados.filter(feriado => feriado.mes === month + 1);
  }, [feriados, month]);

  const isFeriado = useCallback((dia: number, mes: number) => {
    return feriados.some(feriado => feriado.dia === dia && feriado.mes === mes);
  }, [feriados]);
  
  const getNomeFeriado = useCallback((dia: number, mes: number) => {
    const feriado = feriados.find(f => f.dia === dia && f.mes === mes);
    return feriado ? feriado.nome : '';
  }, [feriados]);

  // Função para voltar ao dia atual
  const goToToday = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };


  return (
    <main className="flex flex-col h-screen w-full">
      <header className="flex bg-gray-700 h-12 shadow-md rounded-t-lg">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <section className="flex flex-col items-center h-screen w-full">
        <div className="flex items-center justify-between w-full px-4 py-2  shadow-md">
          <h1 className="text-2xl font-bold">Calendário</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={goToToday}>Hoje</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Adicionar Evento</button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-[351px] rounded-lg pt-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setYear(year - 1)}>&lt;</button>
            <h2 className="text-xl font-semibold py-2">{`${year}`}</h2>
            <button onClick={() => setYear(year + 1)}>&gt;</button>
          </div>


          <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg shadow-md">
            <button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>&lt;</button>
            <h2 className="text-xl font-semibold py-2">{months[month]}</h2>
            <button onClick={() => setMonth((month + 1) % 12)}>&gt;</button>
          </div>

          <div className="flex gap-4">
            {weekdays.map((day, index) => (
              <div key={index} className={`w-8 text-center font-semibold ${index === 0 ? 'text-red-600' : ''}`}>
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          {calendar.map(
            (week, index) => (
              <div key={index} className="flex gap-4">
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className="text-center">
                    {day !== null ? (
                      <div
                        title={getNomeFeriado(day, month + 1)}
                        className={`w-8 h-8 flex items-center justify-center border rounded-lg border-slate-300 
                        ${dayIndex === 0 ? 'border-red-800 border-2 text-red-800 font-bold' : ''}
                        ${isFeriado(day, month + 1) ? 'bg-orange-300 font-bold text-black cursor-pointer' : ''}
                        ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-blue-500 text-white' : ''}`}>
                        {day}
                      </div>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </section>
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold">Feriados em {months[month]}</h3>
        {feriadosDoMesAtual.length > 0 ? (
          <ul className="mt-2">
            {feriadosDoMesAtual.map((feriado, index) => (
              <li key={index} className={`text-sm ${feriado.tipo === 'nacional' ? 'font-bold' : ''}`}>
                {feriado.dia} - {feriado.nome}
                <span className="text-xs ml-2 text-gray-500">
                  ({feriado.tipo === 'nacional' ? 'Nacional' : 'Facultativo'})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Não há feriados neste mês.</p>
        )}
      </div>
    </main>
  )
}