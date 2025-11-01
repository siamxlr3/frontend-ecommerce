import React, { useEffect, useState } from 'react';
import {
    useFetchProductbyIDQuery,
    useUpdateProductMutation,
} from "../../redux/feature/Product/productAPI.js";
import { useParams } from "react-router-dom";
import ButtonLoader from "../../ButtonLoader/buttonLoader.jsx";

const Updateproduct = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useFetchProductbyIDQuery(id);
    const [updateProduct] = useUpdateProductMutation();
    const [uploading, setUploading] = useState(false);

    const [inputdata, setinputdata] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        oldPrice: "",
        color: "",
        image:""
    });

    const productData = data?.data?.Singleproduct || {};
    const { name, category, color, price, image, description,oldPrice } = productData || {};

    useEffect(() => {
        if (productData) {
            setinputdata({
                name: name || "",
                category: category || "",
                color: color || "",
                price: price || 0,
                oldPrice: oldPrice || 0,
                image: image || null,
                description: description || "",
            });
        }
    }, [productData]);

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            setinputdata(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setinputdata(prev => ({ ...prev, [name]: value }));
        }
    };

    const HandleonSubmmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const newdata = new FormData();
            newdata.append("name", inputdata.name);
            newdata.append("category", inputdata.category);
            newdata.append("description", inputdata.description);
            newdata.append("price", inputdata.price);
            newdata.append("oldPrice", inputdata.oldPrice);
            newdata.append("color", inputdata.color);


            if (inputdata.image) {
                newdata.append("image", inputdata.image);
            }


            await updateProduct({ id, newdata }).unwrap();
            alert("Product successfully updated");

            setinputdata({
                name: "",
                category: "",
                description: "",
                price: "",
                oldPrice: "",
                color: "",
                image:""
            });
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="bg-white rounded-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Edit Product</h2>
            <form className="space-y-5" onSubmit={HandleonSubmmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                        value={inputdata.name}
                        onChange={handleOnChange}
                        name="name"
                        type="text"
                        placeholder="Ex: Diamond Earrings"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={inputdata.category}
                        onChange={handleOnChange}
                        name="category"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    >
                        <option>Select Category</option>
                        <option>Accessories</option>
                        <option>Dress</option>
                        <option>Jewellery</option>
                        <option>Cosmetics</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <select
                        value={inputdata.color}
                        onChange={handleOnChange}
                        name="color"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    >
                        <option>Select Color</option>
                        <option>Black</option>
                        <option>Red</option>
                        <option>Gold</option>
                        <option>Blue</option>
                        <option>Silver</option>
                        <option>Beige</option>
                        <option>Green</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        value={inputdata.price}
                        onChange={handleOnChange}
                        name="price"
                        type="number"
                        min={0}
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">OldPrice</label>
                    <input
                        value={inputdata.oldPrice}
                        onChange={handleOnChange}
                        name="oldPrice"
                        type="number"
                        min={0}
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                        onChange={handleOnChange}
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={inputdata.description}
                        onChange={handleOnChange}
                        name="description"
                        placeholder="Write a product description"
                        rows="4"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none resize-none"
                    ></textarea>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        {
                            isLoading || uploading ? <ButtonLoader/> : "Update Product"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Updateproduct;
