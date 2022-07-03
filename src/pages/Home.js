import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import fireDb from '../firebase';
import './Home.css';

function Home() {
  const [data, setData] = useState({});
  useEffect(()=>{
    fireDb.child("contacts").on("value", (snapshot)=>{
      if(snapshot.val() !== null)
      {
        setData({...snapshot.val()});
      }
      else
      {
        setData({});
      }
    });
    return () => {
      setData({})
    };
  }, []);

  function onDelete(id)
  {
    if(window.confirm("Are you sure you want to delete this contact ???"))
    {
      fireDb.child(`contacts/${id}`).remove((error)=>{
        if(error)
        {
          toast.error(error)
        }
        else{
          toast.success("Contact deleted successfully!!!")
        }
      })
    }
  }

  return (
    <div style={{marginTop:"50px"}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Email</th>
            <th style={{textAlign:"center"}}>Contact</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index)=>{
            return(
              <tr key={id}>
                <th scope='row'>{index+1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn-edit'>Edit</button>
                  </Link>
                  <button className='btn-delete' onClick={()=>onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className='btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home