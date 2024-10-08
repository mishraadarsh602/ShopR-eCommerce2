import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUserAsync, selectLoggedInUser } from '../authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectError } from '../authSlice';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);
  return (
     <>
           {user && <Navigate to="/" replace={true}></Navigate>}

      {/* {user!==null && <Navigate to="/" replace={true}></Navigate>} */}
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="http://localhost:3000/assets/images/logo.png"
                alt="ShopR"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                dispatch(loginUserAsync({ email: data.email, password: data.password }))
              })}>            <div>
                  <label htmlFor="email"  className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input autoComplete='true'
                      id="email"
                      {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: "Invalid email address" } })}
                      type="email"
                      // value="test@gmail.com"

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className='text-red-500'>{errors.email && errors.email.message}</p>

                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      autoComplete='true'
                      {...register("password", {
                        required: "Password is required", pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message: `- at least 8 characters
                                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                    - Can contain special characters`}
                      })}
                      type="password"
                   
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className='text-red-500'>{errors.password && errors.password.message}</p>
                    <p className='text-red-500'>{error && (error || error.message)}</p>

                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Create an account
                </Link>
              </p>
            </div>
            <div className="mt-3  absolute bottom-10 right-10 text-gray-400">Demo Login Details
              <h6 className='text-gray-400'>Email : test@gmail.com</h6>
              <h6 className='text-gray-400'>Password : Adarsh@123</h6>

            </div>
          </div>
        </div>
    </>
      )
}

      export default Login;