import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import About from './AboutComponent.js'
import { addComment, fetchDishes } from '../redux/actionCreators'


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions

  }
}


const mapDispathcToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
})


class Main extends React.Component {

  componentDidMount() {
    this.props.fetchDishes()
  }

  render() {
    const HomePage = () => {

      return (
        <Home dish={this.props.dishes.dishes.filter(dish => dish.featured === true)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMessage={this.props.dishes.errorMessage}
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
          addComment={this.props.addComment}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMessage={this.props.dishes.errorMessage}
          dish={this.props.dishes.dishes.filter(d => d.id === Number(match.params.id))[0]}
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
          <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route path="/menu/:id" component={DishWithId} />
          <Route path="/aboutus" component={AboutPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispathcToProps)(Main));
