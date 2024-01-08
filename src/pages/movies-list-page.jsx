import { Card, Col, Row, Table } from 'react-bootstrap';
import { TableItemMovies } from '../components/TableItemMovies';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Paginator } from '../components/paginator';
import { FormSearchMovie } from '../components/FormSearchMovie';
import { FormMovie } from '../components/FormMovie';

export const MoviesListPage = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({})

  const apiCall = async (endpoint = '/api/v1/movies') => {
    const response = await fetch(`http://localhost:3001${endpoint}`);
    const result = await response.json();
    setLoading(false)
    setMovies(result.data)
    setPagination(result.meta)
}

  useEffect(() => {
      apiCall();
}, [])
const handleAddMovie = async (formData) => {
    try {
      let response = await fetch ('http://localhost:3001/api/v1/movies',{
        method : 'POST',
        body : JSON.stringify(formData),
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      let result = await response.json()

      console.log(result);
    } catch (error) {
      console.log(error);
    }
}

  return (

    <>
      <div className="d-sm-flex align-items-center justify-content-between">
				<h1 className="h3 mb-0 text-gray-800">Listado de Pelis</h1>
			</div>

      <Row>
        <Col sm={12} md={4}>
          <FormMovie handleAddMovie={handleAddMovie}/>
        </Col>
        <Col sm={12} md={8}>
        {
      loading ? 
      <Loading/>
      :
    
    
    
      <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
        <FormSearchMovie apiCall={apiCall}/>
        </div>
      <Paginator pagination={pagination} apiCall={apiCall}/>
        <Table striped >
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Duracion</th>
              <th>Rating</th>
              <th>Generos</th>
              <th>Premios</th>
            </tr>
          </thead>
          <tbody>
            {
              movies.map(({ title, length, genre, awards, rating   }, index) => (<TableItemMovies 
                key={index + title}
                title={title}
                length={length}
                rating={rating}
                awards={awards}
                genre={genre} />
              ))
            }
          </tbody>

        </Table>
        <Paginator pagination={pagination} apiCall={apiCall}/>
      </Card.Body>
    </Card>
    }
        </Col>
      </Row>

    
    </>
  );
}

export default MoviesListPage;