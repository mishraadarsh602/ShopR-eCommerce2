import React from 'react'
import ProductSlider from './ProductSlider';
import { selectAllProducts } from '../productSlice';
import { useSelector } from 'react-redux';
const SimilarProductCategories = () => {
  const products = useSelector(selectAllProducts);

  return (
    <>
      <div className='mb-10 flex justify-center relative'>
        <div className='border border-1 border-pink-300 w-full'>
        </div>
        <span className='absolute text-center px-10 bottom-3 bg-white  inline-table -top-5'>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl mb-5 textplayfair'>Latest Products</h1>
        </span>

      </div>
      <ProductSlider products={products} from="0" to="9"></ProductSlider>
    </>
  )
}

export default SimilarProductCategories;