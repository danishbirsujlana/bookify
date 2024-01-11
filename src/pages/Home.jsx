import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { CardGroup } from "react-bootstrap";

function Home() {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const getData = async () => {
        const res = await firebase.getAllBooks();
        setBooks(res.docs);
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="container mt-5">
            <CardGroup>
                {
                    books?.map(book => (
                        <BookCard key={book.id} id={book.id} {...book.data()} />
                    ))
                }
            </CardGroup>
        </div>
    )
}

export default Home;