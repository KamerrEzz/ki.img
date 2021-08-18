import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

    state = {
        loading: false,
        send: false,
        error: null,
        file: null,
        static: null,
    }

    async componentDidMount() {
        this.setState({ loading: true });
    }

    selecFile = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('img', this.state.file)
        axios.post('http://localhost:3001/upload', formData, {})
            .then((e) => {
                this.setState({ send: true, static: e.data})
            }).catch((error) => {
                this.setState({ error })
            })
    }

    

    Form = () => (<form onSubmit={this.onSubmit}>
        <label>
            Subir imagen:
            <input type="file" name="img" onChange={e => this.selecFile(e)} />
        </label>
        <input type="submit" value="Submit" />
    </form>)

    render() {

        if (!this.state.loading) return <div>Loading...</div>

        return (
            <div>
                {this.state.send ? (<img src={'http://localhost:3001/img/' + this.state.static}  alt="send"/>) : (<this.Form />)}
            </div>
        );
    }
}


export default Home;