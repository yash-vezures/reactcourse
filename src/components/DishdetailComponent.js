import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  renderComments(comments) {
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

  renderDish(dish) {
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

  render() {
    if (!this.props.dish) return <div></div>

    return (
      <div className="row">
        {this.renderDish(this.props.dish)}
        {this.renderComments(this.props.dish.comments)}
      </div>
    )
  }
}


export default DishDetail;
