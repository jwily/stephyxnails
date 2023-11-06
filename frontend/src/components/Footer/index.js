const Footer = () => {

    return (
        <div className="fixed bottom-0 bg-primary w-full p-2" style={{ zIndex: 1000 }}>
            <div className="flex justify-around">
                <div>
                    <a href="https://www.instagram.com/stephyxnails/">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
                <div>
                    <a href="mailto:stephyxnails@gmail.com">
                        <i className="fa-regular fa-envelope"></i>
                    </a>
                </div>
                <div>
                    <a href="https://www.tiktok.com/@stephyxnails">
                        <i className="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer
