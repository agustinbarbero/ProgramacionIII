import useCustomForm from "../hooks/useForm";
import { useCrearProducto } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategorias";
function AgregarProducto() {
  const { register, handleSubmit, reset } = useCustomForm({
    nombre: "",
    stock: "",
    precio: "",
    categoriaId: ""
  });

  const crearProducto = useCrearProducto();

  const { data: categorias, isLoading: cargandoCategorias } = useCategorias();

  const onSubmit = (data) => {
    crearProducto.mutate(
      {
        ...data,
        stock: Number(data.stock),
        precio: Number(data.precio)
      },
      {
        onSuccess: () => {
          reset();
          alert("Producto agregado correctamente");
        },
        onError: (error) => {
          alert("Error al agregar el producto" + error.message);
        }
      }
    );
  };

  return (
    <div>
      <h2>Registrar producto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("nombre")}
          placeholder="Ingrese el nombre del producto"
          required
        />
        <select {...register("categoriaId")} required>
          <option value="">Seleccione una categoría</option>
          {cargandoCategorias
            ? <option>Cargando...</option>
            : categorias?.data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
        </select>
        <input
          type="number"
          {...register("stock")}
          placeholder="Stock"
          required
        />
        <input
          type="number"
          {...register("precio")}
          placeholder="Precio"
          required
        />
        <button type="submit" disabled={crearProducto.isLoading}>
          {crearProducto.isLoading ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
}

export default AgregarProducto;
