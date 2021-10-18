import { Container} from "react-bootstrap";
import getPopularMovieData from "../data/popular.js";
import MovieList from "./MovieList.jsx";





const Popular = () => {

        

        return (
            <Container>
                <h4>
                    POPULAR
                    <hr></hr>
                    
                </h4>

                
            </Container>
    
        );

        // render() {
        //     const { error, isLoaded, movies } = this.state;
        //     if (error) {
        //       return <div>Error: {error.message}</div>;
        //     } else if (!isLoaded) {
        //       return <div>Loading...</div>;
        //     } else {
        //       return (
        //         <ul>
        //           {movies.map(movie => (
        //             <li key={movie.id}>
        //               {movie.title}
        //             </li>
        //           ))}
        //         </ul>
        //       );
        //     }
        //   }
}
    

    

export default Popular;
