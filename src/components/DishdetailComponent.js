import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'


const renderDish = (dish) => {
  if (!dish) return <div></div>

  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}


const renderComments = (comments) => {
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
    </div>
  )
}

export default (props) => {
  if (!props.dish) return <div></div>

  return (
    <div class='container'>
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
        {renderComments(props.comments)}
      </div>
    </div>
  )
}
