import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as productoService from '../services/productoService';

export function useProductos(){
    return useQuery('productos', productoService.getProductos);
}

export function useCrearProducto(){
    const queryClient = useQueryClient();
    return useMutation(productoService.createProducto, {
        onSuccess: () => queryClient.invalidateQueries('productos'),
    });
}

export function useActualizarProducto(){
    const queryClient = useQueryClient();
    return useMutation(
        ({id, data}) => productoService.updateProducto(id, data),
        { onSuccess: () => queryClient.invalidateQueries('productos') }
    );
}

export function useEliminarProducto(){
    const queryClient = useQueryClient();
    return useMutation(productoService.deleteProducto, {
        onSuccess: () => queryClient.invalidateQueries('productos'),
    });
}