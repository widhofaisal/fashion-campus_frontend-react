import { useRouter } from "next/router";

import AdminFormLayout from "../../../layouts/AdminFormLayout";

function AdminProductForm() {
    const router = useRouter();
    //console.log(router.query.productId);

    return (
        <AdminFormLayout
            fId={router.query.productId}
            fType="product"
            fKey="product"
        />
    );
}

export default AdminProductForm;