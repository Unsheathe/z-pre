import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Header, LoginButton, Viewer} from './header'
import {InputText } from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber'
import { Button} from 'primereact/button'
import Cookies from 'js-cookie'

const rmitem = () => {}
const mkitem = () => {}

const Options = () => {
  return (<>
    <form>
      <Header />
      <h1>Add stock</h1>
      <InputText id='item_name' type='text'/>
      <br />
      <InputText id='desc' type='text' />
      <br />
      <InputNumber id='quan' type='text'/>
      <br />
      <InputText id='img' type='text' />
      <br />
      <InputNumber id='price' type='text'/>
      <br />
      <Button label="Add Item" type="submit" onClick={(e)=>mkitem(e)}></Button>
    </form>
    <form>
      <Header />
      <h1>Remove stock</h1>
      <InputText id='id' type='text'/>
      <Button label="Delete Item" type="submit" onClick={(e)=>rmitem(e)}></Button>
    </form>
  </>)
}

const StoreDetail = () => {
  const [viewer, setViewer] = useState(0)
  const [inv, setInv] = useState([])
  const {un_id}=useParams()

  useEffect(() => {
    const userid = Cookies.get('un_id')
    if (userid){
      setViewer(userid)
    }
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8080/${un_id}`).then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
  }, [un_id])

  return (<>
    <Header />
    <Viewer />
    <LoginButton />
    <div>
      {inv.map((item) => (
        <div className = 'item'>
          <img alt={`${item.item_name}`} src={item.img} />
          <br />
        </div>
      ))}
    </div>
    {/* If owner of the page is viewing, display additional options */}
    {viewer === un_id ? <Options/> : null}
  </>)
}

export default StoreDetail