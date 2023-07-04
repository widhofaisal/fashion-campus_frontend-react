import { Fragment, useState, useEffect } from "react";
import { hasCookie } from 'cookies-next';

import { useRouter } from "next/router";

import WebsiteHead from "../components/WebsiteHead";
//import AdminNavbar from "../components/admins/AdminNavbar";
import AdminMenubar from "../components/admins/AdminMenubar";
import AdminFormContent from "../components/admins/AdminFormContent";

function AdminFormLayout(props) {
    const router = useRouter();

    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        if (!hasCookie('adminToken')) {
            router.push('/adminLogin');
        } else {
            setShowPage(true);
        }
    }, []);

    return (
        <Fragment>
            {showPage && (<Fragment>
                <WebsiteHead
                    title="Startup Campus Admin Site"
                    desc="Admin system of Startup Campus"
                />
                <AdminMenubar />
                <AdminFormContent {...props} />
            </Fragment>)}
        </Fragment>
    );
}

export default AdminFormLayout;