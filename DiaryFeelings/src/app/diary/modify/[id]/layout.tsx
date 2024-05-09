const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full flex justify-center items-center p-[7px]">
            {children}
        </div>
    )
}

export default Layout