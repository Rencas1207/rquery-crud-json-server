import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsAPI';

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('Product added!');
      queryClient.invalidateQueries('products'); // other request with key ['products']
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const product = Object.fromEntries(data);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    }); // recibo el objeto
    data.reset();
  };

  return (
    <aside className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" />
        <button type="submit">Submit</button>
      </form>
    </aside>
  );
};

export default ProductForm;
