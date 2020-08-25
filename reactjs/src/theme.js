import { createMuiTheme } from "@material-ui/core/styles";
import {
  PRIMARY_COLOR,
  SECUNDARY_COLOR,
  ERROR_COLOR,
  BACKGROUND_COLOR
} from "./config/theme";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR
    },
    secondary: {
      main: SECUNDARY_COLOR
    },
    error: {
      main: ERROR_COLOR
    },
    background: {
      default: BACKGROUND_COLOR
    }
  }
});

export default theme;
