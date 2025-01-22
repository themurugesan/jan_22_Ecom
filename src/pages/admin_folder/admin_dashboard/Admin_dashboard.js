import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_dashboard.css';  // Import CSS
import Headers from '../../header/adminHeader';
import { useContext } from 'react';
import { Usercontext } from '../../../App';
import { useNavigate } from 'react-router-dom';


const Admin_dashboard = () => {
    const {title,setTitle} = useContext(Usercontext);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    // const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');  // New state for product description
    const [amount, setAmount] = useState('');  // New state for product amount
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false); // Toggle for update mode
    const [currentImageId, setCurrentImageId] = useState(null); // ID of the image being edited

   
    

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data } = await axios.get('http://localhost:5000/images');
        setImages(data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
    
        // Form validation
        if (!title || title.length < 3) {
            alert('Title must be at least 3 characters long.');
            return;
        }
    
        if (!description || description.length < 3) {
            alert('Description must be at least 3 characters long.');
            return;
        }
    
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Amount must be a valid number greater than zero.');
            return;
        }
    
        if (!file) {
            alert('Please select an image file.');
            return;
        }
    
        
    
        
    };
    

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/images/${id}`);
        fetchImages();
    };

    const handleEdit = (image) => {
        console.log(image);
        setTitle(image)
        navigate("/adminproduct")
        setEditMode(true);
        setCurrentImageId(image._id);
        setDescription(image.description);  // Set description when editing
        setAmount(image.amount);  // Set amount when editing
    };
console.log(title,"title line 78");

    return (
    <>
    <Headers></Headers>
       
        <div className="app-container">
            
            <h1 className="heading">Category</h1>
            <h2>phone</h2>

            <div className="images-container">
                {images.map((image) => (
                    <div key={image._id} className="image-card">
                        <h2 className="image-title">{image.title}</h2>
                        <p className="image-description">{image.description}</p>
                        <p className="image-price">Price: ${image.amount}</p>
                        <img
                            className="image-thumbnail"
                            src={`http://localhost:5000/${image.image}`}
                            alt={image.title}
                        />
                        <button className="edit-btn" onClick={() =>handleEdit(image)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(image._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div></>
    );
};

export default Admin_dashboard;
