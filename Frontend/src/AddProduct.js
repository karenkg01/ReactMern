
import React, { Fragment, useState, useEffect } from 'react';

//AddProduct will crash backend if its repeated product

const AddProduct = (props) => {//Functional Component

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isTopProduct, setIsTopProduct] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Im in HandleSubmit")
        try {
            const tokenFromLocalStorage = localStorage.getItem('token')
            const body = { name, category, price: parseInt(price), discountPrice: parseInt(discountPrice), description, image, isTopProduct };
            console.log(body)
            const response = await fetch(
                'http://localhost:8080/api/v1/admin/products', {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenFromLocalStorage}` },
                body: JSON.stringify(body)

            });
            const data = await response.json()
            console.log(data)


        } catch (err) {
            console.log(err.message)
        }

        setName('');
        setCategory('');
        setPrice(0);
        setDiscountPrice(0);
        setDescription('');
        setImage('');
        setIsTopProduct(false);
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.replace("/login");
        }

    })
    console.log(handleSubmit)
    return (
        <Fragment>
            <h1 className="text-center p-3"> Add New Product</h1>
            <div className="container" style={{height:'50%', width:'50%'}}>
                <form id="createcontact" className="form" action="http://localhost:8080/api/v1/admin/products" method="post" enctype="multipart/form-data">
                    <div className="form-group">
                        <label >Product Name</label>
                        <input type="text" className="form-control" value={name} id="name" name="name"  onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label >Department</label>
                        <input type="text" className="form-control" value={category} id="category" name="category"  onChange={e => setCategory(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input type="text" className="form-control" value={price} id="price" name="price"  onChange={e => setPrice(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label >Discount Price</label>
                        <input type="text" className="form-control" value={discountPrice} id="discountPrice" name="discountPrice"  onChange={e => setDiscountPrice(e.target.value)}></input>
                    </div>
                    <div className="form-group" >
                        <label >Product Image</label>
                        <input type="file" className="form-control" value={image} id="image" name="image"  onChange={e => setImage(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label >Product Description</label>
                        <textarea type="text" className="form-control" value={description} id="description" name="description"  onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label for="vehicle2"> isTopProduct:</label>
                        <input type="checkbox" id="isTopProduct" name="isTopProduct" value={isTopProduct} onChange={e => setIsTopProduct(bool=> !bool)}/>
                    </div>
                    <input style={{height:'45px', width:'85px'}} type="submit" name="submit" className="btn btn-info " value="submit" ></input>
                </form>
            </div>

        </Fragment>
    );
}

export default AddProduct;