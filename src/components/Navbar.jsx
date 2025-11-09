export default function Navbar({ onAddUser }) {
    return(
        <nav className="navbar navbar-dark bg-dark mb-4 mt-5">
            <div className="container">
                <span className="navbar-brand mb-0 h1">Admin Pro REST API</span>
                <button className="btn btn-outline-light" onClick={onAddUser}> + Add new user</button>
            </div>
        </nav>
    );
}