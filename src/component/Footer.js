import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom'

const Footer = () => {

    return(
        <footer className='mt-5 fott'>
            <div className='container px-5 py-4'>
                <div className='foot-wrap'>
                    <div className='zomato'>
                        <Link to="/" className='brand-link'>
                            <span className="brand-text"><span className='fs-5'>&copy; </span>Zomato <span className='fw-light fs-6'>All Rights Reserved</span></span>
                        </Link>
                    </div>
                    <div className='box'>
                        <div>
                            <ul className='list-group'>
                                <Link className='list-group-item bg-transparent border-0'>About Us</Link>
                                <Link className='list-group-item bg-transparent border-0'>Report</Link>
                            </ul>
                        </div>
                        <div>
                            <ul className='list-group'>
                                <Link className='list-group-item bg-transparent border-0'>Contact</Link>
                                <Link className='list-group-item bg-transparent border-0'>Help</Link>
                            </ul>
                        </div>
                        <div className='fs-3 px-4'>
                            <label className='label'>FOLLOW US ON</label>
                            <section>
                                <Link><i className='bi bi-facebook text-primary'/></Link>
                                <Link><i className='bi bi-instagram text-success mx-4'/></Link>
                                <Link><i className='bi bi-youtube text-danger'/></Link>
                            </section>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer