import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { baseUrl } from '../shared/baseUrl'


import { Loading } from './LoadingComponent'


function RenderCard({ item, isLoading, errMessage }) {
  if (isLoading) return (
    <Loading />
  )

  if (errMessage) return (
    <h4>{errMessage}</h4>
  )

  return (
    <Card>
      <CardImg src={baseUrl + '/' + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  )
}


function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item={props.dish} isLoading={props.dishesLoading} errMessage={props.dishesErrMessage} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotions} isLoading={props.promosLoading} errMessage={props.promosErrMessage} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
