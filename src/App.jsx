import './Sidebar.css';
import {useEffect, useState} from "react";
import axios from 'axios';


function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                setCategories(res.data);
            })
    }
    const fetchProducts = async () => {
        axios.get('http://localhost:8080/api/product')
            .then(res => {
                setProducts(res.data);
            })
    }
    const fetchProductsByCategoryId = async (categoryId) => {
        axios.get('http://localhost:8080/api/product/'+categoryId)
            .then(res => {
                setProducts(res.data);
            })
    }
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    Sidebar Header
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <a onClick={fetchProducts}>
                            All
                        </a>
                    </li>
                    {categories.map(category => (
                        <li key={category.id}>
                            <a onClick={()=>fetchProductsByCategoryId(category.id)}>
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <table className="table table-striped w-75" style={{marginLeft: "280px"}}>
                <thead>
                <tr>
                    <th>Category ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.category.id}</td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </>

    )
}

export default App
