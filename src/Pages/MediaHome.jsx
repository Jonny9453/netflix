import React from 'react'
import styled from 'styled-components'
import PlaySection from '../components/PlaySection/PlaySection';
import MoviesDescription from '../components/MoviesDescription/MoviesDescription';
import '../App.css'
import strangerthings from '../img/strangerthings.jpg'

import {Link, useSearchParams} from 'react-router-dom'
import { getmovies } from '../api';




const Body= styled.div`
    background-image: linear-gradient(to right, black, rgba(0, 0, 0, 0.312)),url(${strangerthings});
    height: auto;
    
`
const H2= styled.h2`
    color:white;
    font-size: 2.4rem;
    font-weight: 500;
    padding-left: 5rem;
    margin-top: 4rem;
`

const List= styled.div`
    width: 14.6rem;
    height: 22.8rem;
    border-radius:1.6rem ;
    overflow: hidden;
    border: 1px solid white;
     ;
`

const Img=styled.img`
    width: 100%;
    object-fit: cover;
`

const Section=styled.section`
 margin-top:3rem ;
 display: flex;
 gap:2rem;
 flex-wrap:wrap;
 justify-content: center;


 
 /* background-image: linear-gradient(to top, black 65% ,rgba(0, 0, 0, 0.312) ); */
`


const Input =styled.input`
    width:10rem;
    padding: 1rem;
    background-color: transparent;
    font-size: 1.5rem;
    border: 1px solid white;
    border-radius: 1rem;
    margin-left: 2rem;
    margin-right: 1rem;
    color: white;
`

const Button=styled.button`
    background-color: red;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    margin-left: .5rem;
    margin-right: .5rem;
`
// const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=931c0e4&s=Harry Potter';







export default function MediaHome() {

  const[searchParams, setSearchParams]=useSearchParams();
  const[loading, setLoading]=React.useState(false)
  const[error, setError]=React.useState(null)
  const filterType= searchParams.get("rating")

  


  const [Movies, setMovies]=React.useState([])
  


  
  
// const getMovies=async (url)=>{
//   fetch(url)
//             .then(res => res.json())
//             .then(data => setMovies(data))
            
// }


   React.useEffect(()=>{     
//     getMovies(url);
async function loadMovies(){
  setLoading(true)
  try{
    const data= await getmovies();
    const displayMovies= filterType? data.results.filter(movie=>movie.vote_average.toString()>=filterType):data.results
    setMovies(displayMovies)
  }
   catch(err){
      setError(err)
  }
  finally{
    setLoading(false)
    }
   
}
loadMovies()
      console.log(Movies)
},[searchParams]);

   
    const list=[];
   if(Movies ){
        for(let i=0; i<Movies.length; i++){
          list.push(<Link state={{search: `?${searchParams.toString()}`,type:filterType}} to={`/Home/${Movies[i].original_title||Movies[i].original_name}`} ><div style={{textAlign:"center", width:"15rem"}}> <List>
            <Img src={`https://image.tmdb.org/t/p/original${Movies[i].poster_path}`} alt='indiana-jones-img' />
          </List><span style={{ fontSize:"1.4rem", fontWeight:"500", color:"white"}}>{Movies[i].original_title||Movies[i].original_name}</span></div></Link>)
      }
   }
      
   function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}


if(loading){
  return(<h1 style={{color:"white"}} aria-live='polite'>loading....</h1>)
}
  
if(error){
  return(<h1 style={{color:"white"}} aria-live='assertive'>error....</h1>)
}

  return (
    <Body>
    
      {/* <Navigationbar/> */}
      <main >
        <div style={{paddingLeft:"5rem"}}>
          <MoviesDescription Title={"Stranger Things"}/>
          <PlaySection />
        </div>
        
        
        <div>
            <H2>Trending Movies & TV Shows</H2>
            <div style={{position:"relative", padding:"3rem"}}>
                <div style={{position:"absolute", right:"6rem" }}>
                <label htmlFor="search"><span style={{color:'white', fontSize:"2rem"}}>Filters:</span></label>
                  <Input id="search" type='number' placeholder='Ratings'/>
                  <Button onClick={()=>{
                    const search=document.getElementById("search").value;
                    // setSearchParams({type:search})
                    handleFilterChange("rating", search)

                  }}>Search</Button>
                  <Button onClick={()=>setSearchParams({})}>Clear</Button>
                </div>
            </div>
            
            
            <Section>
              {list}
            </Section>
        </div>
        
        
      </main>

     
    </Body>
  )
}
