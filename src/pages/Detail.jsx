import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button, Form } from "react-bootstrap";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [data, setData] = useState({});
    const [qty, setQty] = useState(0);
    const [url, setUrl] = useState("");
    const getBook = async (id) => {
        const res = await firebase.getBookById(id);
        setData(res);
    }
    useEffect(() => {
        getBook(id);
    }, [])

    const getImg = async () => {
        if (data) {
            const url = data.img;
            const res = await firebase.getImage(url);
            setUrl(res);
        }
    }

    useEffect(() => {
        getImg();
    }, [data])

    const placedOrder = async () => {
        const res = await firebase.placeOrder(id, qty);
        console.log(res);
        navigate("/orders");
    }

    return (
        <div className="container mt-5">
            <h2>{data.name}</h2>
            <img src={url} width="70%" style={{ borderRadius: "10px" }} />
            <h4 className="my-3">Details</h4>
            <p>Price: {data.price}</p>
            <p>ISB No.: {data.isb}</p>
            <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} className="mb-3" />
            </Form.Group>
            <Button variant="success" className="mb-5" onClick={placedOrder} >But Now</Button>
        </div>
    )
}

export default Detail;