import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, getProducts, updateProduct } from '../api/productsAPI';

const Products = () => {
  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id), // sort product for id
  });

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  return (
    <div className="products">
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Hubo un error 🙃</p>}

      {!isLoading &&
        !isError &&
        products.length > 0 &&
        products?.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button
              onClick={() => {
                deleteProductMutation.mutate(product.id);
              }}
            >
              Delete
            </button>{' '}
            <label htmlFor={product.id}>
              <input
                type="checkbox"
                checked={product.inStock}
                onChange={(e) => {
                  updateProductMutation.mutate({
                    ...product,
                    inStock: e.target.checked,
                  });
                }}
                name="stock"
                id={product.id}
              />
              In Stock
            </label>
          </div>
        ))}
    </div>
  );
};

export default Products;
