import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Smartphone, Monitor, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const WhatsAppBookingPrototype = () => {
  const [activeView, setActiveView] = useState('whatsapp');
  const [tabletView, setTabletView] = useState('calendar');
  const [phoneView, setPhoneView] = useState('calendar');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '¡Hola! Bienvenido a nuestra clínica. ¿En qué puedo ayudarte?', time: '10:30' }
  ]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 22));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 25));
  const [bookings, setBookings] = useState([
    { id: 1, date: '2025-11-25', time: '10:00', client: 'María López', status: 'confirmed', phone: '+591 7123-4567', paid: true, service: 'Limpieza dental' },
    { id: 2, date: '2025-11-25', time: '14:00', client: 'Juan Pérez', status: 'pending', phone: '+591 7234-5678', paid: false, service: 'Consulta general' },
    { id: 3, date: '2025-11-26', time: '09:00', client: 'Ana Martínez', status: 'confirmed', phone: '+591 7345-6789', paid: true, service: 'Ortodoncia' },
    { id: 4, date: '2025-11-27', time: '11:00', client: 'Carlos Rojas', status: 'confirmed', phone: '+591 7456-7890', paid: true, service: 'Endodoncia' },
    { id: 5, date: '2025-11-28', time: '15:00', client: 'Lucía Fernández', status: 'pending', phone: '+591 7567-8901', paid: false, service: 'Blanqueamiento' }
  ]);

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getBookingsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return bookings.filter(b => b.date === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const simulateConversation = () => {
    const conversation = [
      { type: 'user', text: 'Hola, quiero agendar una cita', time: '10:31' },
      { type: 'bot', text: '¡Perfecto! Te mostraré los horarios disponibles. ¿Para qué fecha te gustaría agendar?', time: '10:31' },
      { type: 'user', text: '25 de noviembre', time: '10:32' },
      { type: 'bot', text: 'Horarios disponibles para el 25 de noviembre:\n\n09:00 AM\n11:00 AM\n15:00 PM\n16:00 PM\n17:00 PM\n\n¿Cuál prefieres?', time: '10:32' },
      { type: 'user', text: '15:00', time: '10:33' },
      { type: 'bot', text: '¡Excelente!\n\nTu cita:\nFecha: 25 de noviembre\nHora: 15:00\nServicio: Consulta general\nCosto: Bs. 200\n\nPara confirmar tu reserva, necesitamos un adelanto del 50% (Bs. 100).\n\nPor favor realiza el pago con el siguiente QR:', time: '10:33', showQR: true },
      { type: 'user', text: '[Imagen del comprobante]', time: '10:34', isImage: true },
      { type: 'bot', text: 'Gracias! Hemos recibido tu comprobante de pago.\n\nEstamos validando tu pago. Te confirmaremos tu cita en breve.', time: '10:34' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < conversation.length) {
        setMessages(prev => [...prev, { ...conversation[index], id: prev.length + 1 }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const CalendarView = ({ color = 'blue', view, setView }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Calendario de Citas</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-lg px-4">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth(currentDate).map((day, index) => {
            if (!day) return <div key={`empty-${index}`} className="aspect-square"></div>;

            const dayBookings = getBookingsForDate(day);
            const hasBookings = dayBookings.length > 0;
            const isSelected = isSameDay(day, selectedDate);
            const isPast = day < new Date() && !isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => { setSelectedDate(day); setView('day'); }}
                disabled={isPast}
                className={`aspect-square rounded-lg p-1 text-sm transition relative ${
                  isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isSelected ? `bg-${color}-500 text-white ring-2 ring-${color}-600`
                  : isToday(day) ? 'bg-green-100 text-green-800 font-bold'
                  : hasBookings ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-semibold">{day.getDate()}</div>
                {hasBookings && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                    {dayBookings.slice(0, 3).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : `bg-${color}-500`}`}></div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <h4 className="font-semibold text-sm mb-2">Leyenda:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 bg-${color}-500 rounded`}></div>
            <span>Seleccionado</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setView('payments')}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        <Clock size={20} />
        Ver Pagos Pendientes ({bookings.filter(b => !b.paid).length})
      </button>
    </div>
  );

  const DayView = ({ color = 'blue', setView }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setView('calendar')} className={`flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold`}>
          <ChevronLeft size={20} />
          Volver al calendario
        </button>
        <button onClick={() => setView('payments')} className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold hover:bg-yellow-200">
          Pagos pendientes ({bookings.filter(b => !b.paid).length})
        </button>
      </div>

      <h3 className="text-xl font-bold mb-4">
        Agenda del {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}
      </h3>

      <div className="space-y-2 mb-6">
        {timeSlots.map((time) => {
          const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
          const booking = bookings.find(b => b.date === dateStr && b.time === time);

          return (
            <div
              key={time}
              className={`p-3 rounded-lg border-2 transition ${
                booking
                  ? booking.paid ? `border-${color}-300 bg-${color}-50` : 'border-yellow-300 bg-yellow-50'
                  : 'border-green-300 bg-green-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Clock size={18} className={booking ? `text-${color}-600` : 'text-green-600'} />
                  <span className="font-bold">{time}</span>
                </div>
                {booking ? (
                  booking.paid ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Confirmada</span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">Pendiente</span>
                  )
                ) : (
                  <span className="text-xs text-green-700 font-semibold">Disponible</span>
                )}
              </div>
              {booking && (
                <div className="mt-2 text-sm">
                  <p className="font-semibold text-gray-800">{booking.client}</p>
                  <p className="text-gray-600">{booking.service}</p>
                  <p className="text-gray-500 text-xs">{booking.phone}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`mt-4 bg-${color}-50 border border-${color}-200 rounded-lg p-3`}>
        <h4 className={`font-semibold text-${color}-800 text-sm mb-1`}>Sincronización en Tiempo Real</h4>
        <p className={`text-xs text-${color}-700`}>
          {color === 'purple' ? 'Los cambios se reflejan instantáneamente en la tablet' : 'Actualizaciones instantáneas en todos los dispositivos'}
        </p>
      </div>
    </div>
  );

  const PaymentsView = ({ color = 'blue', setView }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setView('calendar')} className={`flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold`}>
          <ChevronLeft size={20} />
          Volver al calendario
        </button>
      </div>

      <h3 className="text-2xl font-bold mb-4">Pagos Pendientes de Validación</h3>

      {bookings.filter(b => !b.paid).length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <CheckCircle size={48} className="mx-auto mb-3 text-green-400" />
          <p className="text-lg font-semibold">No hay pagos pendientes</p>
          <p className="text-sm mt-1">Todos los pagos han sido validados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.filter(b => !b.paid).map((booking) => (
            <div key={booking.id} className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-lg font-bold text-gray-800">{booking.client}</p>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-semibold">Servicio:</span> {booking.service}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Fecha:</span> {booking.date} - <span className="font-semibold">Hora:</span> {booking.time}
                  </p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">PENDIENTE</span>
              </div>

              <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Comprobante recibido:</p>
                <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Comprobante.jpg</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const updated = bookings.map(b =>
                      b.id === booking.id ? { ...b, paid: true, status: 'confirmed' } : b
                    );
                    setBookings(updated);
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold text-sm transition"
                >
                  Validar Pago
                </button>
                <button
                  onClick={() => setBookings(bookings.filter(b => b.id !== booking.id))}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold text-sm transition"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            <button onClick={() => setActiveView('whatsapp')} className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap ${activeView === 'whatsapp' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}>
              <Smartphone size={20} />
              WhatsApp Bot
            </button>
            <button onClick={() => { setActiveView('phone'); setPhoneView('calendar'); }} className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap ${activeView === 'phone' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
              <Smartphone size={20} />
              Teléfono Principal
            </button>
            <button onClick={() => { setActiveView('tablet'); setTabletView('calendar'); }} className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap ${activeView === 'tablet' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
              <Monitor size={20} />
              Tablet Recepción
            </button>
            <button onClick={() => setActiveView('info')} className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap ${activeView === 'info' ? 'border-b-2 border-gray-500 text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}>
              <Calendar size={20} />
              Información
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema de Reservas Automático WhatsApp</h1>
          <p className="text-gray-600">Prototipo funcional - Sincronización en tiempo real entre dispositivos</p>
        </div>

        {activeView === 'whatsapp' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4 flex items-center gap-3">
                <MessageCircle size={24} />
                <div>
                  <h3 className="font-bold">Clínica Dental Sonrisas</h3>
                  <p className="text-sm text-green-100">Bot automático en línea</p>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-lg p-3 ${msg.type === 'user' ? 'bg-green-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow'}`}>
                      <p className="whitespace-pre-line text-sm">{msg.text}</p>

                      {msg.showQR && (
                        <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                          <div className="w-40 h-40 bg-gray-800 mx-auto flex items-center justify-center mb-2">
                            <span className="text-white text-xs font-bold">QR CODE</span>
                          </div>
                          <p className="text-xs text-center text-gray-600 mb-1">Banco: BCP</p>
                          <p className="text-xs text-center text-gray-600">Cuenta: 123-456789</p>
                          <p className="text-xs text-center font-bold text-gray-800 mt-2">Monto: Bs. 100</p>
                        </div>
                      )}

                      {msg.isImage && (
                        <div className="mt-2 w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-600 text-xs">Comprobante.jpg</span>
                        </div>
                      )}

                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t">
                {messages.length === 1 ? (
                  <button onClick={simulateConversation} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">
                    Iniciar Simulación de Conversación
                  </button>
                ) : messages.length >= 8 ? (
                  <button
                    onClick={() => {
                      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                      setBookings([...bookings, {
                        id: bookings.length + 1,
                        date: dateStr,
                        time: '15:00',
                        client: 'Cliente Nuevo',
                        status: 'pending',
                        phone: '+591 7890-1234',
                        paid: false,
                        service: 'Consulta general'
                      }]);
                      setMessages(prev => [...prev, {
                        id: prev.length + 1,
                        type: 'bot',
                        text: 'Pago validado y confirmado!\n\nTu cita está reservada para el 25 de noviembre a las 15:00.\n\nTe enviaremos un recordatorio 24 horas antes. ¡Gracias!',
                        time: '10:36'
                      }]);
                      setActiveView('tablet');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Simular validación desde recepción
                  </button>
                ) : (
                  <div className="text-center text-gray-500 text-sm">Conversación automática en progreso...</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'phone' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:col-span-2 bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Smartphone className="text-purple-600" size={24} />
                <div>
                  <p className="font-semibold text-purple-800">Teléfono Principal del Propietario</p>
                  <p className="text-sm text-purple-700">Vista sincronizada en tiempo real con la tablet de recepción</p>
                </div>
              </div>
            </div>
            {phoneView === 'calendar' && <CalendarView color="purple" view={phoneView} setView={setPhoneView} />}
            {phoneView === 'day' && <DayView color="purple" setView={setPhoneView} />}
            {phoneView === 'payments' && <PaymentsView color="purple" setView={setPhoneView} />}
          </div>
        )}

        {activeView === 'tablet' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tabletView === 'calendar' && <CalendarView color="blue" view={tabletView} setView={setTabletView} />}
            {tabletView === 'day' && <DayView color="blue" setView={setTabletView} />}
            {tabletView === 'payments' && <PaymentsView color="blue" setView={setTabletView} />}
          </div>
        )}

        {activeView === 'info' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Flujo del Sistema de Reservas</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h4 className="font-bold text-yellow-800">PENDIENTE</h4>
                  </div>
                  <p className="text-sm text-gray-700">Cliente reservó horario pero AÚN NO ha pagado el adelanto del 50%</p>
                  <div className="mt-3 text-xs bg-yellow-100 p-2 rounded">
                    <p className="font-semibold">Estado en calendario:</p>
                    <p>Horario bloqueado temporalmente</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h4 className="font-bold text-blue-800">EN VALIDACIÓN</h4>
                  </div>
                  <p className="text-sm text-gray-700">Cliente envió comprobante. Aparece en "Pagos Pendientes de Validación"</p>
                  <div className="mt-3 text-xs bg-blue-100 p-2 rounded">
                    <p className="font-semibold">Acción requerida:</p>
                    <p>Recepcionista debe validar o rechazar</p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h4 className="font-bold text-green-800">CONFIRMADA</h4>
                  </div>
                  <p className="text-sm text-gray-700">Pago validado. Cita 100% confirmada y horario bloqueado definitivamente</p>
                  <div className="mt-3 text-xs bg-green-100 p-2 rounded">
                    <p className="font-semibold">Resultado:</p>
                    <p>Cliente recibe confirmación automática</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3">Cómo funciona "Pagos Pendientes de Validación":</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <p>Cliente envía comprobante de pago por WhatsApp (foto o PDF)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <p>El sistema automáticamente agrega la reserva a la lista de "Pagos Pendientes"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <p>La recepcionista ve el comprobante en la tablet y tiene 2 opciones:</p>
                  </div>
                  <div className="ml-8 space-y-1">
                    <p className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">VALIDAR</span>
                      → Confirma la cita, envía mensaje de confirmación al cliente
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">RECHAZAR</span>
                      → Elimina la reserva, libera el horario, notifica al cliente
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Sincronización entre Dispositivos</h3>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 rounded-lg p-4 mb-4">
                <p className="text-gray-800 font-semibold mb-2">🔄 Sincronización en Tiempo Real</p>
                <p className="text-sm text-gray-700">
                  El <span className="font-bold text-purple-600">Teléfono Principal</span> y la <span className="font-bold text-blue-600">Tablet de Recepción</span> están 
                  completamente sincronizados. Cualquier cambio que realices en uno se refleja instantáneamente en el otro.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <Smartphone size={20} />
                    Teléfono Principal
                  </h4>
                  <p className="text-sm text-gray-700">El propietario puede ver todas las citas, validar pagos y gestionar el calendario desde su teléfono personal.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Monitor size={20} />
                    Tablet de Recepción
                  </h4>
                  <p className="text-sm text-gray-700">La recepcionista tiene acceso completo a las mismas funciones para gestionar las citas y validar pagos.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Características Implementadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Respuestas automáticas 24/7</p>
                    <p className="text-sm text-gray-600">Bot responde instantáneamente en WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Vista de calendario mensual</p>
                    <p className="text-sm text-gray-600">Visualización clara de todas las citas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Agenda diaria detallada</p>
                    <p className="text-sm text-gray-600">Horarios con información completa del paciente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Bloqueo automático de horarios</p>
                    <p className="text-sm text-gray-600">Evita reservas duplicadas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Pago con QR del 50%</p>
                    <p className="text-sm text-gray-600">Confirmación segura de citas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Panel de validación</p>
                    <p className="text-sm text-gray-600">Control total para la recepcionista</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Sincronización en tiempo real</p>
                    <p className="text-sm text-gray-600">Teléfono y tablet siempre actualizados</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Gestión desde múltiples dispositivos</p>
                    <p className="text-sm text-gray-600">Control total desde cualquier lugar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppBookingPrototype;
