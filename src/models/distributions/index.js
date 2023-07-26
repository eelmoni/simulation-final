import Uniform from "./Uniform";
import Normal from "./Normal";
import NegativeExponential from "./NegativeExponential";

import { UNIFORM, NORMAL_BOX_MULLER, NEGATIVE_EXPONENTIAL } from "./names";

export const D = {
  [UNIFORM]: Uniform,
  [NORMAL_BOX_MULLER]: Normal,
  [NEGATIVE_EXPONENTIAL]: NegativeExponential,
};
