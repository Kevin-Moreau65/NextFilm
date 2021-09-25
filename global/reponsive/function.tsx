import { useMediaQuery } from 'react-responsive'
import { Responsive } from './interface'
import { useState, useEffect } from 'react'
import { Props } from './interface'
export const Mobile = ({ children }: Responsive) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
}
export const Default = ({ children }: Responsive) => {
    const isDesktop = useMediaQuery({ minWidth: 769 })
    return isDesktop ? children : null
}
export const ClientOnly: React.FC<Props> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }
    return children;
};