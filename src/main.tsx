import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import './style/style.scss'
import './style/pagination.scss'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
