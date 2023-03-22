import React from "react"


export default function Homepage(props) {
    return (
        <div>
            {props.movies.map((movie)=>{
                return(
                    <div>
                    <div>{movie.name}({movie.year})</div>
                    <img src={movie.poster}/>
                    </div>
                )
            })}
        </div>
    )
}