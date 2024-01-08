import { PropTypes} from "prop-types";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "react-bootstrap"

export const FormMovie = (handleAddMovie) => {

  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/genres`);
      let result = await response.json()

      console.log(result.data);

      const genresArray = result.data.map(({ id, name }) => ({
        id,
        name
      }));

      const genresOrder = genresArray.sort((a, b) => a.name.localeCompare(b.name));


      setGenres(genresOrder)
      return null;

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    getGenres()
  }, []);

  const formik = useFormik({
    initialValues: {

      title: "",
      rating: 0,
      awards: 0,
      release_date: "",
      length: 0,
      genre_id: "",

    },
    onSubmit: (values) => {
      console.log(values);
      const data = new FormData()
      data.append("title", values.title)
      data.append("rating", values.rating)
      data.append("awards", values.awards)
      data.append("release_date", values.release_date)
      data.append("length", values.length)
      data.append("genre_id", values.genre_id)

      handleAddMovie(data);
      formik.handleReset()
    }
  })


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Agregar Peli
        </CardTitle>
      </CardHeader>
      <CardBody>






        <Form className="row" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo Pelicula"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange} />
          </Form.Group>

          <Form.Group className="mb-3 col-12 col-md-6" >
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" placeholder="Rating Pelicula"
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-12 col-md-6" >
            <Form.Label>Premios</Form.Label>
            <Form.Control type="number" placeholder="Premios Pelicula"
              name="awards"
              value={formik.values.awards}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-12 col-md-6" >
            <Form.Label>Duración</Form.Label>
            <Form.Control type="number" placeholder="Duración Pelicula"
              name="length"
              value={formik.values.length}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-12 col-md-6" >
            <Form.Label>Fecha de estreno</Form.Label>
            <Form.Control type="date" placeholder="Estreno Pelicula"
              name="release_date"
              value={formik.values.release_date}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-12" >
            <Form.Label>Genero</Form.Label>
            <Form.Select className="form-control"
              name="genre_id"
              value={formik.values.genre_id}
              onChange={formik.handleChange}
            >
              <option hidden selected>Selecciona Genero
              </option>
              {genres.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>)
              )}


            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="outline-dark" className="w-100 mt-5">
            Guardar
          </Button>


        </Form>

      </CardBody>
    </Card>
  )
}
FormMovie.prototype = {
  handleAddMovie : PropTypes.func
}
