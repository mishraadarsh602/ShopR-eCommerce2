import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserInfoStatus, selectUserOrders } from '../userSlice';
import { discountedPrice } from '../../../app/constants';
import { Grid } from  'react-loader-spinner'

const UserOrders = () => {

    const userInfo = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);
    console.log("orders",orders);
    const status  = useSelector(selectUserInfoStatus);
    const dispatch = useDispatch();

 useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync());
        dispatch(fetchLoggedInUserOrdersAsync());

       console.log("useEffect in UserOrders");
      
      
    }, [dispatch]);
    // useEffect(() => {
    //     dispatch(fetchLoggedInUserOrdersAsync(userInfo.id));

    // }, [dispatch, userInfo]);
    return (
        <div className="border-gray-200">
            {
                orders && orders.map((order) => (
                    <div key={order.id}>
                        <div className="mx-auto p-3 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* <div className='bg-gray-200 mb-8 inline-block ps-2 pe-10 py-1'><h6>User / My Orders</h6></div> */}

                            <h1 className="text-xl  tracking-tight text-gray-900">Order # {order.id}</h1>
                            <h3 className="text-xl mb-8 tracking-tight text-red-900">Order Status : {order.status}</h3>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <span >{item.product.title}</span>
                                                            </h3>
                                                            <p className="ml-4">{discountedPrice(item.product)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500"> {item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label
                                                                htmlFor="quantity"
                                                                className="ml-3 mr-5 text-sm text-gray-600"
                                                            >Qty : {item.quantity}</label>

                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${order.totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items in cart</p>
                                    <p>{order.totalItems} Items</p>
                                </div>
                                {/*--address--*/}
                                <h3 className="text-2xl my-5 pt-5 font-bold tracking-tight text-gray-900">Shipping Address</h3>

                                <div  className="border-2 border-gray-200 px-5 flex justify-between gap-x-6 py-5">

                                    <div className="flex gap-x-4">
                                      
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.pinCode}</p>

                                        </div>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900 font-semibold">Phone : {order.selectedAddress.phone}</p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            {order.selectedAddress.state}
                                        </p>

                                    </div>
                                </div>
                                {/*address ends*/}

                            </div>
                        </div>
                    </div>
                )) 
            }
            {
             <div className='mx-auto mt-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 text-2xl text-red-500 '>{orders && orders.length===0 && <h1>No Orders Found</h1>}
             </div>  
            }
              {
          status==='loading' ? (
            <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}

            />
          ):null
        }

        </div>
    )
}

export default UserOrders