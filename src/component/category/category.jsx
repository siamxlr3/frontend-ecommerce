import React from 'react';
    import {Link, useParams} from 'react-router-dom';
import {useFetchProductCategoriesQuery} from "../../redux/feature/Product/productAPI.js";
import {ShoppingCart} from "lucide-react";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import Loading from "../../Screenloading/Loading.jsx";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/feature/Cart/cartSlice.js";
import {getToken} from "../../sessionHelper/sessionHelper.js";
import toast from "react-hot-toast";

const Category = () => {
    const {category }=useParams();
    const {data,error,isLoading}=useFetchProductCategoriesQuery(category)
    const product=data?.data || []

    if (isLoading) {
        return <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    }


    const dispatch = useDispatch();
    const HandleaddToCart=(product)=>{
        if(!getToken()){
            toast.error("Please Login First")
            return;
        }
        try {
            dispatch(addToCart(product));
        }catch (error) {

        }
    };

    return (
        <div className="py-10 px-4">
            {/* Category Header */}
            <div className="max-w-[1400px] mx-auto bg-pink-50 bg-opacity-50 rounded-xl p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-3 capitalize">{category}</h1>
                <p className="text-base text-gray-600 max-w-lg mx-auto">
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style
                    today!
                </p>
            </div>

            {/* Product Grid */}
            <div
                className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                {product.map((item) => (
                    <div key={item._id}
                         className="bg-white ho transition-shadow duration-300 overflow-hidden">
                        {/* Product Image */}
                        <div className="relative">
                            <img src={item.image} alt="img" className="w-full h-50 "/>
                            <div className="absolute top-3 right-3 bg-white p-1 rounded-full shadow">
                                <ShoppingCart onClick={() => HandleaddToCart(item)}
                                              className="text-pink-500 cursor-pointer"/>
                            </div>
                        </div>

                        {/* Product Info */}
                        <Link to={`/shope/${item._id}`}>
                            <div className="p-4 text-center">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-pink-600 font-bold">${item.price}</p>
                                <div className="flex justify-center mt-1">
                                    <StarRatings
                                        rating={item.rating}
                                        starRatedColor="#facc15"
                                        numberOfStars={5}
                                        name={`rating-${item.name}`}
                                        starDimension="18px"
                                        starSpacing="2px"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Category;
