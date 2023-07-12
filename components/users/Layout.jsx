export { Layout };

function Layout({ children }) {
    return (
        <div >
            <div className=" w-100 p-10">
                {children}
            </div>
        </div>
    );
}