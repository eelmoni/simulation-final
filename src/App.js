import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';

import { VariablesForm } from './components/VariablesForm.jsx';

function App() {
  return (
    <NextUIProvider>
      <VariablesForm />
    </NextUIProvider>
  );
}

export default App;

/**
 * cantidad de simulaciones (filas)
 * cantidad de lineas que se van a mostrar y a partir de que linea se van a mostrar
 */
