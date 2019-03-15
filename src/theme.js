import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            dark: '#84d68a', //#FF5252
            main: '#FFE57F',
            light: '#FFFFFF',
        },
        error: {
            xLight: red[50],
            main: red[500],
            dark: red[700],
        },
        success: {
            xLight: green[50],
            dark: green[700],
        },
    },
    typography: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: 14,
        fontWeightLight: 300, // Work Sans
        fontWeightRegular: 400, // Work Sans
        fontWeightMedium: 700, // Roboto Condensed
        fontFamilySecondary: "'Roboto Condensed', sans-serif",
    },
});