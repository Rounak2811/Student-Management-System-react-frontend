function OffCanvasNavbar() {

    const handleMouseOver = (evt) => {
        evt.currentTarget.style.backgroundColor = 'skyblue';
    }
    const handleMouseOut = (evt) => {
        evt.currentTarget.style.backgroundColor = 'white';
    }

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ width: '250px' }}>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-primary fw-bold fs-4" id="offcanvasNavbarLabel ">More Options</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end">
                                <li className="nav-item" onMouseOver={(evt) => handleMouseOver(evt)} onMouseOut={(evt) => handleMouseOut(evt)}>
                                    <a className="nav-link active text-primary fw-bold fs-5" aria-current="page" href="#">Dashboard</a>
                                </li>
                                <li className="nav-item " onMouseOver={(evt) => handleMouseOver(evt)} onMouseOut={(evt) => handleMouseOut(evt)}>
                                    <a className="nav-link text-success fw-bold fs-5" href="#">Add Student</a>
                                </li>
                                <li className="nav-item " onMouseOver={(evt) => handleMouseOver(evt)} onMouseOut={(evt) => handleMouseOut(evt)}>
                                    <a className="nav-link text-secondary fw-bold fs-5" href="#">Search Student</a>
                                </li>
                                <li className="nav-item " onMouseOver={(evt) => handleMouseOver(evt)} onMouseOut={(evt) => handleMouseOut(evt)}>
                                    <a className="nav-link text-danger fw-bold fs-5" href="#">Remove Student</a>
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li> */}
                            </ul>
                            {/* <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default OffCanvasNavbar;