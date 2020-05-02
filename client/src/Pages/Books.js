import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../Utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListBook } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
	state = {
		title: " ",
        subtitle: " ",
        authors: " ",
        link: "",
        description: "",
        image: "",
        googleId: "",
	};

	componentDidMount() {
		this.loadBooks();
	}

	loadBooks = () => {
		API.getBooks()
			.then((res) =>
				this.setState({
					title: res.data,
					subtitle: " ",
					authors: " ",
					link: "",
					description: "",
					image: "",
					googleId: ""
				})
			)
			.catch((err) => console.log(err));
	};

	deleteBook = (id) => {
		API.deleteBook(id)
			.then((res) => this.loadBooks())
			.catch((err) => console.log(err));
	};

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
			API.saveItem({
				title: this.state.title,
				authors: this.state.authors,
			})
				.then((res) => this.loadBooks())
				.catch((err) => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>Add Book To List</h1>
						</Jumbotron>
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
								Submit Book
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>My Google Books</h1>
						</Jumbotron>
						{this.state.books.length ? (
							<List>
								{this.state.books.map((book) => (
									<ListBook key={book._id}>
										<Link to={"/books/" + book._id}>
											<strong>
												{book.title} by {book.authors}
											</strong>
										</Link>
										<DeleteBtn
											onClick={() =>
												this.deleteBook(book._id)
											}
										/>
									</ListBook>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Books;
