import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './redux-types';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRootDispatch = () => useDispatch<AppDispatch>();
