import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as categoriaService from '../services/categoriaService';

export function useCategorias() {
  return useQuery('categorias', categoriaService.getCategorias);
}

