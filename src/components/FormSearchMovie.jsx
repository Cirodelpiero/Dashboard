import {PropTypes} from "prop-types";
import {useState} from "react"

export const FormSearchMovie = ({apiCall}) => {

    const [formValues, setformValues] = useState({});
    const handleInputChange = ({target}) => {
        setformValues({
            ...formValues,
            [target.name] : target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValues.keyword)
        apiCall(`/api/v1/movies?keyword=${formValues.keyword}`);
        e.target.reset()
    }
    return (
        <form action="" className="d-flex align-items-center gap-2" onSubmit={handleSubmit}>
            <label htmlFor="">BUSCAR: </label>
            <div className="input-group mb-3">
                <input type="text" className="form-control ml-3" name="keyword" onChange={handleInputChange}/>
                    <div className="input-group-append" style={{cursor:'pointer'}}
                    >
                        <button type="submit" className="input-group-text" id="basic-addon2">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                
                    
            </div>
        </form>
    )
}
FormSearchMovie.propTypes = {
    apiCall : PropTypes.func
}
