import LImage from "../images/L.png";
import LQImage from "../images/LQ.png";
import WImage from "../images/W.png";
import WQImage from "../images/WQ.png";
import ROImage from "../images/RO.png";

export default function LeyLittleTable({ L, LQ, W, WQ, RO, lambda, mu }) {
  return (
    <table>
      <thead>
        <tr key="1">
          <th colSpan="4">Ley de Little</th>
        </tr>
        <tr key="2">
          <th></th>
          <th>Resultado</th>
          <th>Unidades</th>
          <th>Fórmula</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{'λ'}</th>
          <td>{lambda}</td>
          <td>{'paquetes por minuto'}</td>
          <td></td>
        </tr>
        <tr>
          <th>{'μ'}</th>
          <td>{mu}</td>
          <td>{'paquetes por minuto'}</td>
          <td></td>
        </tr>
        <tr>
          <th>ρ</th>
          <td>{RO}</td>
          <td>{'Factor de utilización'}</td>
          <td>
            <img src={ROImage} width={75} alt="ρ" />
          </td>
        </tr>
        <tr>
          <th>L</th>
          <td title="valor esperado del número de clientes en el sistema">{L}</td>
          <td>{'paquetes'}</td>
          <td>
            <img src={LImage} width={75} alt="L" />
          </td>
        </tr>
        <tr>
          <th>Lq</th>
          <td title="valor esperado del número de clientes en cola">{LQ}</td>
          <td>{'paquetes'}</td>
          <td>
            <img src={LQImage} width={75} alt="LQ" />
          </td>
        </tr>
        <tr>
          <th>W</th>
          <td title="tiempo medio de respuesta (espera en sistema)">{W}</td>
          <td>{'minutos'}</td>
          <td>
            <img src={WImage} width={75} alt="W" />
          </td>
        </tr>
        <tr>
          <th>Wq</th>
          <td title="tiempo medio de espera en cola">{WQ}</td>
          <td>{'minutos'}</td>
          <td>
            <img src={WQImage} width={75} alt="WQ" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
