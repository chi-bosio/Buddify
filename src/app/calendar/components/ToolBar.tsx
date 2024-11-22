export const CustomToolbar = (props: any) => {
    const { label, onNavigate, onView, views } = props;
    return (
      <div className="flex flex-col lg:flex-row justify-between items-center p-2 bg-customPalette-graydark text-customPalette-white">
        <button
          className="lg:text-lg lg:px-3 text-sm customPalette-graydark border border-customPalette-blue hover:bg-customPalette-blue transition-all ease-in-out duration-300 p-1 rounded text-customPalette-white"
          onClick={() => onNavigate('TODAY')}
        >
          Hoy
        </button>
        <div className="flex justify-center items-center gap-2 w-full">
          <button
            className="lg:text-lg lg:px-3 text-sm customPalette-graydark border border-customPalette-blue hover:bg-customPalette-blue transition-all ease-in-out duration-300 p-1 rounded text-customPalette-white"
            onClick={() => onNavigate('PREV')}
          >
            Anterior
          </button>
          <span className="lg:text-lg lg:px-3 text-sm mx-2">{label}</span>
          <button
            className="lg:text-lg lg:px-3 text-sm customPalette-graydark border border-customPalette-blue hover:bg-customPalette-blue transition-all ease-in-out duration-300 p-1 rounded text-customPalette-white"
            onClick={() => onNavigate('NEXT')}
          >
            Siguiente
          </button>
        </div>
  
        <div className="flex justify-center items-center gap-2 w-full">
          {views.map((view: string) => (
              <button
                key={view}
                className={`lg:text-lg lg:px-3 mr-2 text-sm customPalette-graydark border border-customPalette-blue hover:bg-customPalette-blue transition-all ease-in-out duration-300 px-1 py-2 rounded text-customPalette-white ${
                  props.view === view ? 'bg-customPalette-blue' : ''
                }`}
                onClick={() =>{ 
                  const mappedView = view === 'week' ? 'week' : view;
                  onView(mappedView)}}
              >
                {view === 'month'
                  ? 'Mes'
                  : view === 'week'
                    ? 'Semana'
                    : view === 'day'
                      ? 'Día'
                      : view === 'agenda'
                        ? 'Agenda' 
                        : ''}
              </button>
            ))}
        </div>
      </div>
    );
  };