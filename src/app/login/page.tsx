export default function Login() {
    return (
        <div className='max-w-xl rounded-lg mx-auto mt-40 py-20 px-10'>
            <div className='flex flex-col border rounded-xl p-10 '>
                <h1 className='text-center font-bold text-xl sm:text-2xl'> Login to your account</h1>
                <form className='w-full space-y-10 mt-10 flex flex-col pb-8'>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Email
                            </p>
                            <input type='email'
                            required
                            placeholder="Email address"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Password
                            </p>
                            <input type='password'
                            required
                            placeholder="Password"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <button type="submit"
                         className='px-6 py-2 border rounded-xl w-fit mx-auto font-medium text-black cursor-pointer bg-white hover:bg-white/80 duration-200'>Login</button>
                </form>
            </div>
        </div>
    )
}