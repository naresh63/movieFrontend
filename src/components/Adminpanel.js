import React, { useEffect, useState } from 'react';
// admin panel
const Adminpanel=()=>{
    let[amovie,setAMovie]=useState(['']); // 
   let[name,setName]=useState('');
   let[genre,setGenre]=useState('');
   //
   let[upname,setUpname]=useState('');
   let[upgenre,setUpGenre]=useState('');

//movies---------------------------------------------------------------------
    useEffect(()=>{
        fetch("http://localhost:8000/movies") // backend name crud api
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
      // send collected data to db by fetch using POST
      function addMovie(){
          fetch(`http://localhost:8000/createMovie`,{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
                },
              body:JSON.stringify({
                name:name,
                genre:genre
              })
          })
          .then(response=> response.json())
          .then((data)=>{
              if(data !==null){
                let  tempmovi=[...amovie,data.movie];
                setAMovie(tempmovi); 
              }
          })
          .catch(err=> console.log(err))
      }
     // update functionality---------------------------------------------------------------------------------------
     let movid=""
     let upmovi={}
      function updateMovie(id){
          movid=id
          console.log(movid)
         let selectedMovi=amovie.filter(m=>{
              return m._id===id
          })
        let[{name,genre}]=selectedMovi; // this from obj 
         setUpname(name)
         setUpGenre(genre)
        //
      }
      // update button functionality
      function update1movie(){
        upmovi={
            name:upname,
            genre:upgenre
        }
          console.log(upmovi)
        fetch("http://localhost:8000/updatemovies/"+movid,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(upmovi)
        })
        .then((response)=> response.json()) 
        .then((data)=>{
              console.log(data)
              setAMovie(amovie)
        })
        .catch(err=>console.log(err))     
      }
     //---------------------------------------------------------------------------------------------------------
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
                   <button onClick={()=>{addMovie()}}>Add movie</button>
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
                                   <td> <button onClick={()=>{updateMovie(mov._id)}}>Update</button> 
                                      <button onClick={()=>{deleteMovie(mov._id)}}>Delete</button>
                                    </td>
                             </tr>
                            )
                        })
                    }
                </tbody>
            </table> <br/>
            {/* update div --------------------------------------------------------------------------------*/}
            <div className='update-model'>
            <input type="text" value={upname}  onChange={(event)=>{
                           setUpname(event.target.value)
                   }}/>
                    <input type="text" value={upgenre}  onChange={(event)=>{
                        setUpGenre(event.target.value)
                    }}/>
                    <button onClick={ ()=>{
                        update1movie()
                    }
                        }>update movie now </button>
            </div>
        </div>
    )
}

export default Adminpanel;