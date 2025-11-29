import { useDispatch } from 'react-redux'
import './App.css'
import EventForm from './components/EventForm'
import Header from './components/Header'
import MyEvents from './components/MyEvents'
import Toast from './components/Toast'
import { useEffect } from "react";
import { getProfiles } from './redux/ProfileSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return (
    <>
      <Header />
      <div id="content-flex">
        <EventForm />
        <MyEvents />
      </div>
      <Toast />
    </>
  )
}

export default App
