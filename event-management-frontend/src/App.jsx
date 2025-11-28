import { Provider } from 'react-redux'
import './App.css'
import EventForm from './components/EventForm'
import Header from './components/Header'
import MyEvents from './components/MyEvents'
import ReduxStore from './redux/ReduxStore'

function App() {

  return (
    <Provider store={ReduxStore}>
      <Header />
      <div id="content-flex">
        <EventForm />
        <MyEvents />
      </div>
    </Provider>
  )
}

export default App
