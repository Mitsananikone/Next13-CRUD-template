import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <nav className="flex items-center justify-between bg-highlight px-3 py-2">
            <div className="flex space-x-4">
                <NavLink href="/" exact className="text-white">Home</NavLink>
                <NavLink href="/users" className="text-white">Users</NavLink>
                <button onClick={userService.logout} className="text-white">Logout</button>
            </div>
        </nav>
    );
}