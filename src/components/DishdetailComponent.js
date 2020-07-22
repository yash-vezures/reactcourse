import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { baseUrl } from '../shared/baseUrl'

import { Loading } from './LoadingComponent'


const required = (val) => val && val.length;


const maxLength = (len) => (val) => !(val) || (val.length <= len)


const minLength = (len) => (val) => !(val) || (val.length >= len)


class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, Number(values.rating), values.fullname, values.comment)
  }

  render() {
    return (
      <React.Fragment>
        <Button className="btn btn-outline-info" onClick={this.toggleModal}><span class="fa fa-pencil"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" xs={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" xs={12}>Your name</Label>
                <Col xs={12}>
                  <Control.text model=".fullname" id="author" name="author"
                    placeholder="Your name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors className="text-danger" model=".fullname" show="touched" messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: 'Must be 15 characters or less'
                  }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" xs={12}>Comment</Label>
                <Col xs={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6" className="form-control"> </Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                   </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}


const renderDish = (dish) => {
  if (!dish) return <div></div>

  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + '/' + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}


const renderComments = (comments, addComment, dishId) => {
  if (!comments.length) return <div></div>

  const commentList = comments.map(comment => (
    <li key={comment.id}>
      <p>{comment.comment}</p>
      <p>-- {comment.author}, {comment.date.slice(0, comment.date.indexOf('T'))}</p>
    </li>
  ))

  return (
    <div className="col-12 col-md-5 m-1" style={{ textAlign: "left" }}>
      <h4>Comments</h4>
      <ul className='list-unstyled'>
        {commentList}
      </ul>
      <CommentForm addComment={addComment} dishId={dishId} />
    </div>
  )
}

export default (props) => {
  if (props.dishesLoading) return (
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>
  )

  if (props.dishesErrMessage) return (
    <div className="container">
      <div className="row">
        <h4>{this.props.dishesErrMessage}</h4>
      </div>
    </div>
  )

  if (!props.dish) return <div></div>

  return (
    <div className='container'>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu"> Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {renderDish(props.dish)}
        {console.log(props.comments)}
        {renderComments(props.comments, props.addComment, props.dish.id)}
      </div>
    </div>
  )
}
