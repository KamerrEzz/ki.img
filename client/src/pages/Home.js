import React, { Component } from 'react';

class Home extends Component {

    state = {
        loading: false,
        error: null,
        data: []
    }

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:3001/");
            const res = await response.json()
            setTimeout(() => {
                this.setState({ loading: true, data: res.data });
            }, 1000);
        } catch (error) {
            this.setState({
                loading: true,
                error: error,
            })
        }
    }

    Spinner = () => {
        return (
            <div className="load">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }


    render() {

        if(!this.state.loading) return (<this.Spinner />)

        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    {this.state.data.map((a,i) => (
                        <div className="col-lg-3 col-md-12 mb-2" key={i}>
                            <div className="card">
                                <img className="img-fluid" src={'http://localhost:3001/img/'+a} alt={a} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


export default Home;