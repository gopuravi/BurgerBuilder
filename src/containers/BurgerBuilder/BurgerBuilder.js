import React,{ Component } from "react";
import Aux from '../../hoc/Auxillary';
import Burger from '../../componenets/Burger/Burger';
import BuildControls from '../../componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese : 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    state= {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseSate (ingrdients){

        const sum=Object.keys(ingrdients)
        .map(igKey =>{
            return ingrdients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el},0);

            this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldcounter=this.state.ingredients[type];
        const updatedCount = oldcounter+1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
   

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseSate(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldcounter=this.state.ingredients[type];
        if(oldcounter <=0){return}
        const updatedCount = oldcounter-1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;

        const priceReduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice-priceReduction;

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseSate(updatedIngredients);
    }

    purchaseHandler=()=> {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=() =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=() =>{
        alert('You Continue!')
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        return (
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                <OrderSummary ingredients={this.state.ingredients} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;