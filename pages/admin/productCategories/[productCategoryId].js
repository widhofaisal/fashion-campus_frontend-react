import { useRouter } from "next/router";

import AdminFormLayout from "../../../layouts/AdminFormLayout";

function AdminProductCategoryForm() {
    const router = useRouter();

    //console.log(router.query.productId);

    return (
        <AdminFormLayout
            fId={router.query.productCategoryId}
            fType="product category"
            fKey="productCategory"
        />
    );
}

export default AdminProductCategoryForm;