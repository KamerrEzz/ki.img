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
            console.log(res);
            this.setState({ loading: true, data: res.data });
        } catch (error) {
            this.setState({
                loading: true,
                error: error,
            })
        }
    }




    render() {

        if(!this.state.loading) return <div>Loading...</div>

        return (
            <div>
                {this.state.data.map((a,i) => (
                    <img src={'http://localhost:3001/img/'+a} alt={a} key={i} />
                ))}
            </div>
        );
    }
}


export default Home;