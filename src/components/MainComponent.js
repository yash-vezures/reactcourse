import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import About from './AboutComponent.js'


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions

  }
}


class Main extends React.Component {
  render() {
    const HomePage = () => {

      return (
        <Home dish={this.props.dishes.filter(dish => dish.featured === true)[0]}
          promotions={this.props.promotions.filter(promotion => promotion.featured === true)[0]}
          leader={this.props.leaders.filter(leader => leader.featured === true)[0]}
        />
      )
    }

    const AboutPage = () => {

      return (
        <About leaders={this.props.leaders} />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.props.dishes.filter(d => d.id === Number(match.params.id))[0]}
          comments={this.props.comments.filter(c => c.dishId === Number(match.params.id))}
        />
      )
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/contactus" component={Contact} />
          <Route path="/menu/:id" component={DishWithId} />
          <Route path="/aboutus" component={AboutPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(Main));
