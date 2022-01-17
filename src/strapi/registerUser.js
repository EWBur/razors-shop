import axios from 'axios';
import {prodUrl} from './URL'
import setupUser from './setupUser'


async function registerUser({email,password,username}) {
    console.log(`${prodUrl}auth/local/register`);
    const response = await axios.post(
            `${prodUrl}auth/local/register`,
            {email, password, username}
            )
        .catch(err =>console.log(err));

    if (response){
        setupUser(response);
    }    
    return response;
}

export default registerUser;