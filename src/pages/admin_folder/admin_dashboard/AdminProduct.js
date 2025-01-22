import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Admin_dashboard.css';  // Import CSS
import Headers from '../../header/adminHeader';
import { Usercontext } from '../../../App';

const AdminProduct = () => {
     const {title} = useContext(Usercontext);
     console.log(title,"title");
    
    const [images, setImages] = useState([]);
    // const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');  // New state for product description
    const [amount, setAmount] = useState('');  // New state for product amount
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false); // Toggle for update mode
    const [currentImageId, setCurrentImageId] = useState(null); // ID of the image being edited

   
    

    

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
    
        // Proceed with form submission if validation passes
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('amount', amount);
        formData.append('image', file);
    
        try {
            if (editMode) {
                // Update an existing image
                await axios.put(`http://localhost:5000/images/${currentImageId}`, formData);
                setEditMode(false); // Exit edit mode
                setCurrentImageId(null); // Reset current image
            } else {
                // Create a new image
                await axios.post('http://localhost:5000/upload', formData);
            }
    
            setTitle('');
            setDescription('');
            setAmount('');
            setFile(null);
            fetchImages(); // Refresh the list of images
        } catch (error) {
            alert('Error uploading image. Please try again.');
        }
    };
    

    

    return (
    <>
    <Headers></Headers>
       
        <div className="app-container">
            
            <h1 className="heading">Add Product</h1>
            <form className="upload-form" onSubmit={handleUpload}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Title"
                    value={title.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Product Description"
                    value={title.description}
                    onChange={(e) => setDescription(e.target.value)}  // Handle change for description
                />
                <input
                    type="number"
                    className="input-field"
                    placeholder="Product Amount"
                    value={title.amount}
                        
                    onChange={(e) => setAmount(e.target.value)}  // Handle change for amount
                />
                <input
                    type="file"
                    className="input-field"
                    
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="submit-btn" type="submit">{editMode ? 'Update' : 'Upload'}</button>
            </form>

           
        </div></>
    );
};

export default AdminProduct;
