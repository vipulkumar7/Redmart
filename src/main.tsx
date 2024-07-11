import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import './style/style.scss'
import './style/pagination.scss'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
// import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Auth0Provider
  //   domain={import.meta.env.VITE_DOMAIN_URL as string}
  //   clientId={import.meta.env.VITE_CLIENT_ID as string}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  // >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </Auth0Provider>,
)
