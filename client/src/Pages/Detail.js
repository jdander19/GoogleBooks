import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import API from "../Utils/API";

class Detail extends Component {
	state = {
		book: [{}],
		title: "",
		authors: "",
	};
	// When this component mounts, grab the item with the _id of this.props.match.params.id
	// e.g. localhost:3000/books/599dcb67f0f16317844583fc
	componentDidMount() {
		API.getBook(this.props.match.params.id)
			.then((res) =>
				this.setState({
					book: res.data,
					title: res.data[0].title,
					authors: res.data[0].authors,
				})
			)
			.catch((err) => console.log(err));
	}

	handleInputChange(property) {
		return (e) => {
			this.setState({
				[property]: e.target.value,
			});
		};
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		if (this.state.title && this.state.authors) {
			API.updateBook(this.props.match.params.id, {
				title: this.state.title,
				authors: this.state.authors,
			})
				.then((res) => this.loadChanges())
				.catch((err) => console.log(err));
		}
	};

	loadChanges = () => {
		API.getBook(this.props.match.params.id)
			.then((res) => this.setState({ book: res.data }))
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h1>
								{this.state.item[0].title} by{" "}
								{this.state.item[0].authors}
							</h1>
						</Jumbotron>
					</Col>
				</Row>
				<Row>
					<Col size="md-2">
						<Link to="/">← Back to Book List</Link>
					</Col>
					<Col size="md-2">
						<h2>Edit The Book</h2>
					</Col>
				</Row>
				<Row>
					<Col size="md-6">
						<form>
							<Input
								value={this.state.title}
								onChange={this.handleInputChange("title")}
								name="title"
								placeholder="title (required)"
							/>
							<Input
								value={this.state.author}
								onChange={this.handleInputChange("authors")}
								name="authors"
								placeholder="Authors (required)"
							/>
							<FormBtn
								disabled={
									!(this.state.authors && this.state.title)
								}
								onClick={this.handleFormSubmit}>
								Submit Changes
							</FormBtn>
						</form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Detail;
