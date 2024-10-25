import { RegisterProductForm } from "./register-product";


export default function RegisterProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Product</h1>
      <RegisterProductForm />
    </div>
  )
}