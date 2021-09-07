import React, { Component } from 'react';
import axios from 'axios';
import path from 'path';

class Home extends Component {

    state = {
        loading: false,
        send: false,
        error: null,
        file: null,
        static: null,
        render: null
    }

    async componentDidMount() {
        this.setState({ loading: true });
    }

    selecFile = (e) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(e.target.files[0].name));
        if(!extname){
            this.setState({ 
                error: {message: 'No se permite ese formato, seleccion otro.'}, 
                render: null,
                file: null
            });
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                this.setState({
                    error: null,
                    render: [reader.result],
                    file: e.target.files[0]
                });
            }
        }

    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('img', this.state.file)
        axios.post('http://localhost:3001/upload', formData, {headers: { 'content-type': 'multipart/form-data' }})
            .then((e) => {
                this.setState({ send: true, static: e.data})
            }).catch((error) => {
                this.setState({ error })
            })
    }

    

    Form = () => (
    <div className="row mt-5 h-500">
        <div className="col-lg-6 col-md-6">
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Subir imagen:</label>
                    <input className="form-control" type="file" name="img" onChange={e => this.selecFile(e)} />
                </div>
                <div>{this.state.error ? this.state.error.message : (<input className="btn btn-primary mb-3" type="submit" value="Submit" />)}</div>
            </form>
        </div>
        <div className="col-lg-6 col-md-6">
            <img className="img-fluid" src={this.state.render} alt=""/>
        </div>
    </div>
    )

    render() {

        if (!this.state.loading) return <div>Loading...</div>

        return (
            <div className="container">
                {this.state.send ? (<img src={'http://localhost:3001/img/' + this.state.static.data}  alt="send"/>) : (<this.Form />)}
            </div>
        );
    }
}


export default Home;