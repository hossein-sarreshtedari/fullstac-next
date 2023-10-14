import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import User from '@/models/User';

import conectDB from '@/utils/conectDB';

const Home = ({ users }) => {

  const [dataForSend, setDataForSend] = useState({

    name: "",
    email: "",
    age: "",
    phone: "",
    courses: "",

  })

  const [dataShow, setDataShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateList, setUpdateList] = useState(false);


  const [idUser, setIdUser] = useState("");
  const [emailUser, setEmailUser] = useState("");

  useEffect(() => {

    setIsLoading(true);

    axios
      .get("/api/data")
      .then(res => {

        if (res.status) {

          setDataShow(res.data.data)
          setIsLoading(false)
        }
      })
      .catch(error => {

        window.alert("problem in catch");
        console.log(error);
      })


  }, [updateList])


  const inputHandler = (e) => {

    setDataForSend({ ...dataForSend, [e.target.name]: e.target.value })
  }


  const sendDataHandler = async (e) => {

    e.preventDefault();

    const bodySend = {

      name: dataForSend.name,
      email: dataForSend.email,
      age: +dataForSend.age,
      phone: dataForSend.phone,
      courses: dataForSend.courses.split("-"),
    }


    axios
      .post("/api/data", bodySend)
      .then(res => {

        console.log(res)

        if (res.data.status) {

          window.alert("add Succsessfuly user");
          setDataForSend({
            name: "",
            email: "",
            age: "",
            phone: "",
            courses: "",
          })

          setUpdateList(!updateList);


        }
        else {

          window.alert("problem");

        }

      })
      .catch(error => {

        window.alert("problem in catch");
        console.log(error);
      })

  }


  const EditeClick = (id, email) => {

    setIdUser(id)
    setEmailUser(email)

  }


  const saveHandler = async () => {

    await axios
      .patch(`/api/data/${idUser}`, { email: emailUser })
      .then(res => {

        if (res.data.status) {

          window.alert(res.data.message)

        }
      })

    setIdUser("")
    setUpdateList(!updateList)

  }


  const deleteHandler = async (id) => {

    await axios
      .delete(`/api/data/${id}`)
      .then(res => {

        if (res.data.status) {

          window.alert(res.data.message);
        }
      })

    setUpdateList(!updateList)
  }

  return (

    <>

      <h1>Add Users</h1>

      <form className='myform' onSubmit={sendDataHandler}>

        <input type='text' placeholder='name' name="name" value={dataForSend.name} onChange={inputHandler} />
        <input type='text' placeholder='email' name="email" value={dataForSend.email} onChange={inputHandler} />
        <input type='text' placeholder='age' name="age" value={dataForSend.age} onChange={inputHandler} />
        <input type='text' placeholder='phone' name="phone" value={dataForSend.phone} onChange={inputHandler} />
        <input type='text' placeholder='nameCourse then -' name="courses" value={dataForSend.courses} onChange={inputHandler} />



        <button className='btnSend' type='submit'>Post</button>

      </form>

      {!isLoading ?

        <>
          <div className='usersDiv'>

            {users.map(item => {

              return <React.Fragment key={item._id}> <ul >

                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.age}</li>
                <li><Link href={`/${item._id}`}><button style={{ cursor: "pointer" }}>See</button></Link></li>
                <li><button onClick={() => EditeClick(item._id, item.email)}>Edite</button></li>
                <li><button onClick={() => deleteHandler(item._id)}>Delete</button></li>

              </ul>

                {emailUser && idUser === item._id && <div>
                  <input type='text' value={emailUser} name="email" onChange={(e) => setEmailUser(e.target.value)} />
                  <button onClick={saveHandler}>Save</button>
                </div>}

              </React.Fragment>

            })}

          </div>
            <h1>-------------pre_rendering--------------------</h1>
          <div className='usersDiv'>

            {dataShow.map(item => {

              return <React.Fragment key={item._id}> <ul >

                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.age}</li>
                <li><Link href={`/${item._id}`}><button style={{ cursor: "pointer" }}>See</button></Link></li>
                <li><button onClick={() => EditeClick(item._id, item.email)}>Edite</button></li>
                <li><button onClick={() => deleteHandler(item._id)}>Delete</button></li>

              </ul>

                {emailUser && idUser === item._id && <div>
                  <input type='text' value={emailUser} name="email" onChange={(e) => setEmailUser(e.target.value)} />
                  <button onClick={saveHandler}>Save</button>
                </div>}

              </React.Fragment>

            })}

          </div>

        </>

        :


        <h1>Loading...</h1>

      }

    </>
  );
};

export default Home;


export async function getServerSideProps() {

  try {

    await conectDB();
    const users = await User.find();

    return {

      props: { users: JSON.parse(JSON.stringify(users)) }
    }



  }
  catch (err) {

    return {

      notfound: true
    }

  }

}