import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

function BookCard(props) {
    const { name, price, img, id } = props;
    const navigate = useNavigate();

    const firebase = useFirebase();
    const [url, setUrl] = useState("");

    const getImageUrl = async (img) => {
        const res = await firebase.getImage(img);
        setUrl(res);
    }
    useEffect(() => {
        getImageUrl(img);
    }, [])
    return (
        <Card style={{ width: '18rem', margin: "20px" }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>$ {price}</Card.Text>
                <Button onClick={() => navigate(`/book/detail/${id}`)} variant="dark">View Details</Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;