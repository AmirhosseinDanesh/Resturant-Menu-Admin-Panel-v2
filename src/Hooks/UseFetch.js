import React, { useEffect, useState } from 'react'

export default function UseFetch(url) {
    const [data , setData] = useState([])
    
    useEffect(()=>{
        fetch(url)
            .then(res=>res.json())
            .then(data=>setData(data))
    })
  return [data];
}
