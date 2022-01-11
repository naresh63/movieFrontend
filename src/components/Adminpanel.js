import React, { useEffect, useState } from 'react';
// admin panel
const Adminpanel=()=>{
    let[amovie,setAMovie]=useState(['']); // 
   let[name,setName]=useState('');
   let[genre,setGenre]=useState('');
   //
    useEffect(()=>{
        fetch("http://localhost:8000/movies") // backed name crud api
        .then((response)=>
            response.json() )
        .then((movies)=>{
            console.log(movies) 
            setAMovie(movies)
          })
        .catch((err)=> console.log(err))
    },[])
    // delete functionality ------------------------------------------------------------------------------
    function deleteMovie(id){
        let upmov ={}
        fetch(`http://localhost:8000/movies/${id}`,{method:"DELETE"})
        .then((response)=> response.json())
        .then(()=> {
            console.log("movie deleted")
            upmov = amovie.filter(m=>{
                return m._id !== id;
            })
            setAMovie(upmov);
        })
        .catch((err)=> console.log(err)) 
    }
     // add movie functionality --------------------------------------------------------------------------
        // collect input data
    
     const mymovi ={
         name:name,
         genre:genre
     }
    console.log(mymovi)
      // send collected data to db by fetch using POST
      function addMovie(){
        console.log(mymovi)
        let tempmovi=[]
          fetch(`http://localhost:8000/createMovie`,{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
                },
              body:JSON.stringify(mymovi)
          })
          .then(response=> response.json())
          .then((data)=>{
              tempmovi=[...amovie,data.movie]
              setAMovie(tempmovi); 
          })
          .catch(err=> console.log(err))
      }
    return(
        <div>
            <h1>Admin panel </h1>

                <div className="modal"> 
                   <input type="text" value={name}  onChange={(event)=>{
                           setName(event.target.value)
                   }}/>
                    <input type="text" value={genre}  onChange={(event)=>{
                        setGenre(event.target.value)
                    }}/>
                   <button onClick={ addMovie}>Add movie</button>
                </div> 
              {/* table for admin panel */}
            <table>
                <tbody>
                    {
                        amovie.map((mov,index)=>{
                            return(
                                <tr key={index}>
                                   <td>{mov.name}  </td>
                                   <td>{mov.genre} </td>
                                   <td> <button>Update</button> 
                                      <button onClick={()=>{
                                        deleteMovie(mov._id)
                                        }}>Delete</button> 
                                    </td>
                             </tr>
                            )
                        })
                    }
                 
                </tbody>
               
            </table>
        </div>
    )
}

export default Adminpanel;