import { Fragment, useEffect, useState } from "react";
import { hasCookie } from 'cookies-next';

import { useRouter } from "next/router";

import WebsiteHead from "../components/WebsiteHead";
//import AdminNavbar from "../components/admins/AdminNavbar";
import AdminMenubar from "../components/admins/AdminMenubar";
import AdminContent from "../components/admins/AdminContent";

function AdminLayout(props) {
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
        <AdminContent {...props} />
      </Fragment>)
      }
    </Fragment>
  );
}

export default AdminLayout;
