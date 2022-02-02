import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import store from '../redux/store';
import {Provider} from 'react-redux';
import '../styles/globals.css'



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <div dir='rtl'>
      <Navbar/>
      <Component {...pageProps} />
    </div>    
    </Provider>
  )
}

export default MyApp
