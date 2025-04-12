import { PizzaCreate } from "../components/PizzasConteiner/PizzaCreate";
import { Pizzas } from "../components/PizzasConteiner/Pizzas";


const PizzasPage = () => {
    return (
        <div>
            <PizzaCreate/>
            <hr/>
            <Pizzas/>
        </div>
    );
};

export {PizzasPage};