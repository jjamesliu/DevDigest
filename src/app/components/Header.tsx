

export default function Header() {
    return (
        <div className='mt-[0.8rem] flex items-center w-lg mx-auto justify-between rounded-full '>
            <img src='/newspaper.svg' alt='newspaper brand logo' className="w-[3rem]" />
            <button className='rounded-full bg-[#222222] px-[1rem] py-[0.3rem]'>Login</button>
        </div>
    )
}