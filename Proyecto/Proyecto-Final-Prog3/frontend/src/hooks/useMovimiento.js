import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as movimientoService from '../services/movimientoService';

export function useMovimientos() {
  return useQuery('movimientos', movimientoService.getMovimientos);
}

