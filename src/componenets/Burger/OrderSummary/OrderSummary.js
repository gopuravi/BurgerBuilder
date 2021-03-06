import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';
const orderSummary =(props)=>{

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize' }}> {igKey}</span> : {props.ingredients[igKey]} </li>
    });

    return(
    <Aux>
        <h3> Your Order</h3>
        <p> A deliciuous burger with following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
    
        <p>Continue to check out</p>
        <Button btnType="Danger"  clicked={props.purchaseCancelled}>Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
    );
}

export default orderSummary;