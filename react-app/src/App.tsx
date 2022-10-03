import './App.css'
import {AuthContextProvider} from './contexts/auth';
import RouteConfig from './route/config';
import { SnackbarProvider } from 'notistack';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {CookiesProvider} from 'react-cookie'

function App() {

  return (
    <CookiesProvider>
      <SnackbarProvider
        maxSnack={3}
        //anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        iconVariant={{
          success:<CheckCircleIcon/>,
          error:<ErrorIcon />
        }}
      >
        <AuthContextProvider>
          <RouteConfig />
        </AuthContextProvider>
      </SnackbarProvider>
    </CookiesProvider>
  )
}

export default App
