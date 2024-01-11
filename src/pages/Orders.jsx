import { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

function Orders() {
    const firebase = useFirebase();
    
    const fetchOrders = async () => {
        const res = await firebase.fetchOrders();
        console.log(res[0].data());
    }

    useEffect(() => {
        // fetchOrders()
    }, []);
    
    return (
        <div>Orders</div>
    )
}

export default Orders;