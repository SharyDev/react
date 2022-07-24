import React, { Component } from 'react';
import Menu from "./MenuComponents";
import { DISHES } from "../Shared/dishes";
import { COMMENTS } from '../Shared/comments';
import { PROMOTIONS } from '../Shared/promotions';
import { LEADERS } from '../Shared/leaders';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from "./AboutComponents";
import Contact from "./ContactComponent";
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

 
  
  render(){
    const HomePage = () => {
      return(
          <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    const AboutPage =() =>{
      return(
        <About leaders={this.state.leaders}></About>
      )
    }
    
    return (
      <>
      
      <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route exact path="/aboutus" component={AboutPage}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer />

      
      </>
    );
  }
}

export default Main;
