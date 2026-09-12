function Footer() {
    return (
        <footer className="bg-red-800 text-red-300 py-5 mt-12 border-t border-red-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl font-semibold tracking-wide text-white">Movie App</h2>
                <p className="mt-3 text-sm">&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;