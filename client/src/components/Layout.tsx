import Navbar from './Navbar';

import { ReactNode } from 'react';
type LayoutProps = {
    children: ReactNode
  }
const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            < Navbar />
            <div className='container'> {children} </div>
        </div>
    )
}
export default Layout