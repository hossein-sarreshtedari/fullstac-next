import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const UserDetail = () => {

    const router = useRouter();
    const { userId } = router.query;

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios
            .get(`/api/data/${userId}`)
            .then(res => {
              

                    setUserData(res.data.data);
                    setIsLoading(false)
             
            })
            .catch(error => {

                console.log(error);
            })


    }, [])

    return (

        !isLoading ?

            <div>

                <h1>{userData.name}</h1>

                <p>id: ${userData._id}</p>
                <p>email: ${userData.email}</p>
                <p>age: ${userData.age}</p>
                <p>phone: ${userData.phone}</p>

                <ul>
                    
                    {userData.courses.map((item, index) => {

                        <li key={index}>{item}</li>
                    })}

                </ul>




            </div>

            :

            <h1>Loading ...</h1>
    );
};

export default UserDetail;

