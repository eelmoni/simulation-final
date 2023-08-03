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
          <th colSpan="3">Ley de Little</th>
        </tr>
        <tr key="2">
          <th></th>
          <th>Resultado</th>
          <th>Fórmula</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{'λ'}</th>
          <td>{lambda}</td>
          <td></td>
        </tr>
        <tr>
          <th>{'μ'}</th>
          <td>{mu}</td>
          <td></td>
        </tr>
        <tr>
          <th>ρ</th>
          <td>{RO}</td>
          <td>
            <img src={ROImage} width={75} alt="ρ" />
          </td>
        </tr>
        <tr>
          <th>L</th>
          <td>{L}</td>
          <td>
            <img src={LImage} width={75} alt="L" />
          </td>
        </tr>
        <tr>
          <th>Lq</th>
          <td>{LQ}</td>
          <td>
            <img src={LQImage} width={75} alt="LQ" />
          </td>
        </tr>
        <tr>
          <th>W</th>
          <td>{W}</td>
          <td>
            <img src={WImage} width={75} alt="W" />
          </td>
        </tr>
        <tr>
          <th>Wq</th>
          <td>{WQ}</td>
          <td>
            <img src={WQImage} width={75} alt="WQ" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
