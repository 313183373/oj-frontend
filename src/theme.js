import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors//indigo';
import grey from '@material-ui/core/colors/grey';

export default createMuiTheme({
  palette: {
    primary: {
        main: '#000000',
    },
    secondary: {
        dark: '#84d68a', //#FF5252
        main: '#FFE57F',
        light: '#FFFFFF',
    } // Indigo is probably a good match with pink
  },
  typography: {
    useNextVariants: true,
  },
});