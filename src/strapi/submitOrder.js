import axios from "axios";
import {prodUrl} from "./URL"

async function submitOrder({
                name,
                total,
                items,
                stripeTokenId,
                userToken,
            }){
    console.log(name)

    //let data = { name : "asda sad", total : total, items : items, stripeTokenId : stripeTokenId };
    const response = await axios.post(`${prodUrl}orders`,  
        {
            data : 
            {
                name,
                total,
                items,
                stripeTokenId,
            },   
        },
        {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
        }
    ).catch(err => console.error(err))
    console.log(`${prodUrl}orders`,  
        {
            data : 
            {
                name,
                total,
                items,
                stripeTokenId,
            },   
        },
        {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
        })
    return response
}

export default submitOrder;