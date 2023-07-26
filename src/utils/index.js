export const RESTAURAR = 'restaurar';
export const MODIFICAR = 'restaurar';

/**
 fin_atencion_restaurar	"Uniforme x= 2 + RND . 8"	0 - 0,59
 fin_atencion_modificar	"Uniforme x= 1 + RND . 5"	0,60 - 0,99
*/

const intervals = {
  first: { from: 0,to: 0.59 },
  second: { from: 0.6,to: 0.99 },
};

export const getClientServiceType = () => {
  const RND = Math.random();
  let serviceType = undefined;

  if (RND >= intervals.first.from && RND <= intervals.first.to) {
    serviceType = RESTAURAR;
  } else if (RND >= intervals.second.from && RND <= intervals.second.to) {
    serviceType = MODIFICAR;
  }

  return serviceType;
};

export const isPair = (number) => { return number % 2 === 0; };
