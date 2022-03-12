import React, {useEffect} from 'react'
import '../styles/popup.css';
import {useDispatch, useSelector} from 'react-redux';
import PopUpDetail from './PopUpDetail';
import {getProductsAsync} from '../redux/ProductSlice';
import {motion} from 'framer-motion';
import {popup} from '../animations';
const ProductPopUp = ({id, image, name, setIsPopUp, setPId, setIsEditP}) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProductsAsync({
            id
        }));
    }, [dispatch]);
    return (
        <>
        
        <span onClick={()=> {setIsPopUp(false)}} className="toggle-btn"><i class="fas fa-times"></i></span>
        <motion.div variants={popup} initial="hidden" animate="show" className="popup-main">
            <div className="popup-inner">
               
                {products.length > 0 ? (<>
                
            {products?.map((product) => (<>
				<PopUpDetail 
                key={product.id} 
                id={product._id}  
                image={product.image} 
                name={product.name} 
                price={product.price} 
                description={product?.description}
                discount={product.discount} 
                category={product.category}
                setPId={setPId}
                r_id={product.restaurant_id}
                setIsEditP={setIsEditP}
                />
                </>
			))}
            </>
            ) : 
            (
                <div>
                    <h2 className='text-white'>No Products To Show</h2>
                </div>
            )}

                
            </div>
        </motion.div>
        </>
    )
}

export default ProductPopUp
